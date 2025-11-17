// =====================================================
// ADMIN TEAM MEMBERS MANAGEMENT ROUTES - COMPLETE VERSION
// File: zuree_telecom_api/routes/admin/team.js
// =====================================================

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getPool } = require('../../server');
const { verifyToken } = require('./auth');

// Configure multer for team member image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/team/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'team-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  },
});

// Helper function to log activity
async function logActivity(pool, adminId, action, entityId, details) {
  try {
    await pool.query(
      `INSERT INTO admin_activity_log (admin_id, action, entity_type, entity_id, details) 
       VALUES (?, ?, 'team_member', ?, ?)`,
      [adminId, action, entityId, details]
    );
  } catch (err) {
    console.error('Error logging activity:', err);
  }
}

// =====================================================
// GET ALL TEAM MEMBERS
// =====================================================
router.get('/', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status || 'all';
    const department = req.query.department || 'all';

    const pool = getPool();

    // Build WHERE clause
    let whereClause = '1=1';
    const params = [];

    if (status !== 'all') {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (department !== 'all') {
      whereClause += ' AND department = ?';
      params.push(department);
    }

    // Get total count
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM team_members WHERE ${whereClause}`,
      params
    );
    const totalCount = countResult[0].total;
    const totalPages = Math.ceil(totalCount / limit);

    // Get team members
    const [members] = await pool.query(
      `SELECT * FROM team_members 
       WHERE ${whereClause}
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      members,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit
      }
    });
  } catch (err) {
    console.error('Error fetching team members:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching team members',
      error: err.message
    });
  }
});

// =====================================================
// GET DEPARTMENTS
// =====================================================
router.get('/departments', verifyToken, async (req, res) => {
  try {
    const pool = getPool();

    const [departments] = await pool.query(
      `SELECT DISTINCT department, COUNT(*) as count
       FROM team_members
       WHERE department IS NOT NULL
       GROUP BY department
       ORDER BY department`
    );

    res.json({
      success: true,
      departments
    });
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching departments',
      error: err.message
    });
  }
});

// =====================================================
// GET SINGLE TEAM MEMBER BY ID
// =====================================================
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [members] = await pool.query(
      'SELECT * FROM team_members WHERE id = ?',
      [id]
    );

    if (members.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      member: members[0]
    });
  } catch (err) {
    console.error('Error fetching team member:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching team member',
      error: err.message
    });
  }
});

// =====================================================
// CREATE NEW TEAM MEMBER
// =====================================================
router.post('/', verifyToken, async (req, res) => {
  try {
    const { 
      name, 
      position, 
      department, 
      email, 
      phone, 
      bio, 
      imageUrl, 
      linkedin, 
      twitter, 
      status 
    } = req.body;

    if (!name || !position) {
      return res.status(400).json({ 
        success: false,
        message: 'Name and position are required' 
      });
    }

    const pool = getPool();
    const [result] = await pool.query(
      `INSERT INTO team_members 
       (name, position, department, email, phone, bio, image_url, linkedin, twitter, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, 
        position, 
        department || null, 
        email || null, 
        phone || null, 
        bio || null, 
        imageUrl || null, 
        linkedin || null, 
        twitter || null, 
        status || 'active'
      ]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'create', result.insertId, `Created team member: ${name}`);

    res.status(201).json({ 
      success: true,
      message: 'Team member created successfully',
      memberId: result.insertId
    });
  } catch (err) {
    console.error('Error creating team member:', err);
    res.status(500).json({ 
      success: false,
      message: 'Error creating team member',
      error: err.message
    });
  }
});

// =====================================================
// UPDATE TEAM MEMBER
// =====================================================
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      position, 
      department, 
      email, 
      phone, 
      bio, 
      imageUrl, 
      linkedin, 
      twitter, 
      status 
    } = req.body;

    if (!name || !position) {
      return res.status(400).json({ 
        success: false,
        message: 'Name and position are required' 
      });
    }

    const pool = getPool();

    // Check if member exists
    const [existing] = await pool.query('SELECT * FROM team_members WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    // Update team member
    await pool.query(
      `UPDATE team_members 
       SET name = ?, position = ?, department = ?, email = ?, 
           phone = ?, bio = ?, image_url = ?, linkedin = ?, twitter = ?, status = ?
       WHERE id = ?`,
      [
        name, 
        position, 
        department || null, 
        email || null, 
        phone || null, 
        bio || null, 
        imageUrl !== undefined ? imageUrl : existing[0].image_url,
        linkedin || null,
        twitter || null,
        status || existing[0].status,
        id
      ]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'update', id, `Updated team member: ${name}`);

    res.json({ 
      success: true,
      message: 'Team member updated successfully' 
    });
  } catch (err) {
    console.error('Error updating team member:', err);
    res.status(500).json({ 
      success: false,
      message: 'Error updating team member',
      error: err.message
    });
  }
});

// =====================================================
// DELETE TEAM MEMBER
// =====================================================
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    // Check if member exists
    const [existing] = await pool.query('SELECT name FROM team_members WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    // Delete team member
    await pool.query('DELETE FROM team_members WHERE id = ?', [id]);

    // Log activity
    await logActivity(pool, req.adminId, 'delete', id, `Deleted team member: ${existing[0].name}`);

    res.json({ 
      success: true,
      message: 'Team member deleted successfully' 
    });
  } catch (err) {
    console.error('Error deleting team member:', err);
    res.status(500).json({ 
      success: false,
      message: 'Error deleting team member',
      error: err.message
    });
  }
});

// =====================================================
// UPDATE TEAM MEMBER STATUS
// =====================================================
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: active or inactive'
      });
    }

    const pool = getPool();
    
    await pool.query('UPDATE team_members SET status = ? WHERE id = ?', [status, id]);

    // Log activity
    await logActivity(pool, req.adminId, 'update_status', id, `Changed team member status to: ${status}`);

    res.json({
      success: true,
      message: `Team member status updated to ${status}`
    });
  } catch (err) {
    console.error('Error updating team member status:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating team member status',
      error: err.message
    });
  }
});

// =====================================================
// UPLOAD TEAM MEMBER IMAGE
// =====================================================
router.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded'
      });
    }

    const imageUrl = `/uploads/team/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl
    });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: err.message
    });
  }
});

module.exports = router;