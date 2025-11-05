// =====================================================
// ADMIN BLOG MANAGEMENT ROUTES
// routes/admin/blogs.js
// =====================================================

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getPool } = require('../../server');
const { verifyToken } = require('./auth');

// Configure multer for blog image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/blogs/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'blog-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
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

// Helper function to create URL-friendly slug
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to log activity
async function logActivity(pool, adminId, action, entityId, details) {
  await pool.query(
    `INSERT INTO admin_activity_log (admin_id, action, entity_type, entity_id, details) 
     VALUES (?, ?, 'blog', ?, ?)`,
    [adminId, action, entityId, details]
  );
}

// =====================================================
// GET ALL BLOGS (Admin view with all statuses)
// =====================================================
router.get('/', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status || 'all';
    const search = req.query.search || '';

    const pool = getPool();

    // Build WHERE clause
    let whereClause = '1=1';
    const params = [];

    if (status !== 'all') {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      whereClause += ' AND (title LIKE ? OR author LIKE ? OR category LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Get total count
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM blogs WHERE ${whereClause}`,
      params
    );
    const totalCount = countResult[0].total;
    const totalPages = Math.ceil(totalCount / limit);

    // Get blogs
    const [blogs] = await pool.query(
      `SELECT 
        b.id, b.title, b.url_title, b.description, b.img, b.author, 
        b.category, b.tags, b.status, b.date, b.views,
        b.created_at, b.updated_at,
        a.full_name as created_by_name
       FROM blogs b
       LEFT JOIN admin_users a ON b.created_by = a.id
       WHERE ${whereClause}
       ORDER BY b.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit
      }
    });
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: err.message
    });
  }
});

// =====================================================
// GET SINGLE BLOG BY ID
// =====================================================
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [blogs] = await pool.query(
      `SELECT 
        b.*, 
        a.full_name as created_by_name
       FROM blogs b
       LEFT JOIN admin_users a ON b.created_by = a.id
       WHERE b.id = ?`,
      [id]
    );

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      blog: blogs[0]
    });
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: err.message
    });
  }
});

// =====================================================
// CREATE NEW BLOG
// =====================================================
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      author,
      category,
      tags,
      metaTitle,
      metaDescription,
      status,
      date
    } = req.body;

    if (!title || !description || !author) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and author are required'
      });
    }

    const pool = getPool();
    
    // Create URL-friendly slug
    const urlTitle = createSlug(title);

    // Check if URL title already exists
    const [existing] = await pool.query(
      'SELECT id FROM blogs WHERE url_title = ?',
      [urlTitle]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'A blog with this title already exists'
      });
    }

    const imagePath = req.file ? req.file.path : null;

    // Insert blog
    const [result] = await pool.query(
      `INSERT INTO blogs 
       (title, url_title, description, img, author, category, tags, 
        meta_title, meta_description, status, date, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        urlTitle,
        description,
        imagePath,
        author,
        category || null,
        tags || null,
        metaTitle || title,
        metaDescription || description.substring(0, 160),
        status || 'draft',
        date || new Date().toISOString().split('T')[0],
        req.adminId
      ]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'create', result.insertId, `Created blog: ${title}`);

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blogId: result.insertId
    });
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: err.message
    });
  }
});

// =====================================================
// UPDATE BLOG
// =====================================================
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      author,
      category,
      tags,
      metaTitle,
      metaDescription,
      status,
      date
    } = req.body;

    const pool = getPool();

    // Check if blog exists
    const [existing] = await pool.query('SELECT * FROM blogs WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // If title changed, create new URL slug
    let urlTitle = existing[0].url_title;
    if (title && title !== existing[0].title) {
      urlTitle = createSlug(title);
      
      // Check if new URL title already exists
      const [duplicates] = await pool.query(
        'SELECT id FROM blogs WHERE url_title = ? AND id != ?',
        [urlTitle, id]
      );

      if (duplicates.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'A blog with this title already exists'
        });
      }
    }

    const imagePath = req.file ? req.file.path : existing[0].img;

    // Update blog
    await pool.query(
      `UPDATE blogs SET 
       title = ?, url_title = ?, description = ?, img = ?, 
       author = ?, category = ?, tags = ?, 
       meta_title = ?, meta_description = ?, status = ?, date = ?
       WHERE id = ?`,
      [
        title || existing[0].title,
        urlTitle,
        description || existing[0].description,
        imagePath,
        author || existing[0].author,
        category || existing[0].category,
        tags || existing[0].tags,
        metaTitle || existing[0].meta_title,
        metaDescription || existing[0].meta_description,
        status || existing[0].status,
        date || existing[0].date,
        id
      ]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'update', id, `Updated blog: ${title || existing[0].title}`);

    res.json({
      success: true,
      message: 'Blog updated successfully'
    });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: err.message
    });
  }
});

// =====================================================
// DELETE BLOG
// =====================================================
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    // Check if blog exists
    const [existing] = await pool.query('SELECT title FROM blogs WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Delete blog
    await pool.query('DELETE FROM blogs WHERE id = ?', [id]);

    // Log activity
    await logActivity(pool, req.adminId, 'delete', id, `Deleted blog: ${existing[0].title}`);

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: err.message
    });
  }
});

// =====================================================
// BULK UPDATE STATUS
// =====================================================
router.post('/bulk-update-status', verifyToken, async (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Blog IDs array is required'
      });
    }

    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const pool = getPool();

    // Update status for all selected blogs
    await pool.query(
      `UPDATE blogs SET status = ? WHERE id IN (?)`,
      [status, ids]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'bulk_update', null, `Updated ${ids.length} blogs to ${status}`);

    res.json({
      success: true,
      message: `${ids.length} blog(s) updated successfully`
    });
  } catch (err) {
    console.error('Error bulk updating blogs:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating blogs',
      error: err.message
    });
  }
});

module.exports = router;