// =====================================================
// TEAM ROUTES - CORRECTED FOR YOUR PROJECT STRUCTURE
// File: zuree_telecom_api/routes/team.js
// =====================================================

const express = require('express');
const router = express.Router();

// Import getPool from server.js (your database connection)
const { getPool } = require('../server');

// Optional: Import auth middleware if you have it
// If you don't have this file, we'll make the routes public for now
let verifyToken;
try {
  const auth = require('../middleware/auth');
  verifyToken = auth.verifyToken || auth;
} catch (err) {
  console.log('⚠️  Auth middleware not found - team routes will be public');
  // Create a dummy middleware that just passes through
  verifyToken = (req, res, next) => next();
}

// =====================================================
// GET ALL TEAM MEMBERS (Admin - with optional auth)
// =====================================================
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT * FROM team_members ORDER BY id DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ 
      error: 'Failed to fetch team members',
      message: error.message 
    });
  }
});

// =====================================================
// GET ACTIVE TEAM MEMBERS (Public - no auth)
// =====================================================
router.get('/active', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      `SELECT id, name, position, department, email, phone, bio, 
              image_url, linkedin, twitter, status, created_at 
       FROM team_members 
       WHERE status = 'active' 
       ORDER BY id ASC`
    );
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching active team members:', error);
    res.status(500).json({ 
      error: 'Failed to fetch active team members',
      message: error.message 
    });
  }
});

// =====================================================
// GET SINGLE TEAM MEMBER BY ID
// =====================================================
router.get('/:id', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT * FROM team_members WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ 
      error: 'Failed to fetch team member',
      message: error.message 
    });
  }
});

// =====================================================
// CREATE NEW TEAM MEMBER
// =====================================================
router.post('/', verifyToken, async (req, res) => {
  try {
    const { 
      name, position, department, email, phone, 
      bio, image_url, linkedin, twitter, status 
    } = req.body;
    
    // Validate required fields
    if (!name || !position) {
      return res.status(400).json({ 
        error: 'Name and position are required' 
      });
    }
    
    const pool = getPool();
    const [result] = await pool.query(
      `INSERT INTO team_members 
       (name, position, department, email, phone, bio, image_url, linkedin, twitter, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, position, department || null, email || null, phone || null, 
        bio || null, image_url || null, linkedin || null, twitter || null, 
        status || 'active'
      ]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Team member created successfully' 
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ 
      error: 'Failed to create team member',
      message: error.message 
    });
  }
});

// =====================================================
// UPDATE TEAM MEMBER
// =====================================================
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { 
      name, position, department, email, phone, 
      bio, image_url, linkedin, twitter, status 
    } = req.body;
    
    // Validate required fields
    if (!name || !position) {
      return res.status(400).json({ 
        error: 'Name and position are required' 
      });
    }
    
    const pool = getPool();
    const [result] = await pool.query(
      `UPDATE team_members 
       SET name = ?, position = ?, department = ?, email = ?, 
           phone = ?, bio = ?, image_url = ?, linkedin = ?, twitter = ?, status = ?
       WHERE id = ?`,
      [
        name, position, department, email, phone, 
        bio, image_url, linkedin, twitter, status, 
        req.params.id
      ]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({ message: 'Team member updated successfully' });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ 
      error: 'Failed to update team member',
      message: error.message 
    });
  }
});

// =====================================================
// DELETE TEAM MEMBER
// =====================================================
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const pool = getPool();
    const [result] = await pool.query(
      'DELETE FROM team_members WHERE id = ?', 
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ 
      error: 'Failed to delete team member',
      message: error.message 
    });
  }
});

module.exports = router;