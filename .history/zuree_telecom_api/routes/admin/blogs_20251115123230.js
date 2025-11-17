// =====================================================
// ADMIN BLOGS MANAGEMENT ROUTES - COMPLETE VERSION
// File: zuree_telecom_api/routes/admin/blogs.js
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
  try {
    await pool.query(
      `INSERT INTO admin_activity_log (admin_id, action, entity_type, entity_id, details) 
       VALUES (?, ?, 'blog', ?, ?)`,
      [adminId, action, entityId, details]
    );
  } catch (err) {
    console.error('Error logging activity:', err);
  }
}

// =====================================================
// GET ALL BLOGS (with pagination and filters)
// =====================================================
router.get('/', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status || 'all';
    const search = req.query.search || '';
    const category = req.query.category || 'all';

    const pool = getPool();

    // Build WHERE clause
    let whereClause = '1=1';
    const params = [];

    if (status !== 'all') {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (category !== 'all') {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      whereClause += ' AND (title LIKE ? OR content LIKE ? OR author LIKE ?)';
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
        b.id, b.title, b.url_slug, b.author, b.category, b.excerpt,
        b.featured_image, b.status, b.published_date, b.views,
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
// GET BLOG CATEGORIES
// =====================================================
router.get('/categories', verifyToken, async (req, res) => {
  try {
    const pool = getPool();
    const [categories] = await pool.query(
      `SELECT DISTINCT category, COUNT(*) as count
       FROM blogs
       WHERE category IS NOT NULL
       GROUP BY category
       ORDER BY category`
    );

    res.json({
      success: true,
      categories
    });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
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
      `SELECT b.*, a.full_name as created_by_name
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
router.post('/', verifyToken, async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      content,
      excerpt,
      featuredImage,
      tags,
      status,
      publishedDate
    } = req.body;

    if (!title || !author || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, author, and content are required'
      });
    }

    const pool = getPool();
    const urlSlug = createSlug(title);

    // Check if slug already exists
    const [existing] = await pool.query('SELECT id FROM blogs WHERE url_slug = ?', [urlSlug]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'A blog with a similar title already exists'
      });
    }

    // Insert blog
    const [result] = await pool.query(
      `INSERT INTO blogs 
       (title, url_slug, author, category, content, excerpt, featured_image, 
        tags, status, published_date, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        urlSlug,
        author,
        category || 'General',
        content,
        excerpt || content.substring(0, 200),
        featuredImage || null,
        tags || null,
        status || 'draft',
        publishedDate || (status === 'published' ? new Date().toISOString().split('T')[0] : null),
        req.adminId
      ]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'create', result.insertId, `Created blog: ${title}`);

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blogId: result.insertId,
      urlSlug
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
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      author,
      category,
      content,
      excerpt,
      featuredImage,
      tags,
      status,
      publishedDate
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

    // Create new slug if title changed
    let urlSlug = existing[0].url_slug;
    if (title && title !== existing[0].title) {
      urlSlug = createSlug(title);
      
      // Check if new slug conflicts with other blogs
      const [conflicts] = await pool.query(
        'SELECT id FROM blogs WHERE url_slug = ? AND id != ?',
        [urlSlug, id]
      );
      
      if (conflicts.length > 0) {
        urlSlug = `${urlSlug}-${Date.now()}`;
      }
    }

    // Update blog
    await pool.query(
      `UPDATE blogs SET 
       title = ?, url_slug = ?, author = ?, category = ?,
       content = ?, excerpt = ?, featured_image = ?, tags = ?,
       status = ?, published_date = ?
       WHERE id = ?`,
      [
        title || existing[0].title,
        urlSlug,
        author || existing[0].author,
        category || existing[0].category,
        content || existing[0].content,
        excerpt || existing[0].excerpt,
        featuredImage !== undefined ? featuredImage : existing[0].featured_image,
        tags !== undefined ? tags : existing[0].tags,
        status || existing[0].status,
        publishedDate !== undefined ? publishedDate : existing[0].published_date,
        id
      ]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'update', id, `Updated blog: ${title || existing[0].title}`);

    res.json({
      success: true,
      message: 'Blog updated successfully',
      urlSlug
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
// UPDATE BLOG STATUS
// =====================================================
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: draft, published, or archived'
      });
    }

    const pool = getPool();

    // Update status and published_date if publishing
    const publishedDate = status === 'published' ? new Date().toISOString().split('T')[0] : null;
    
    await pool.query(
      `UPDATE blogs SET status = ?, published_date = COALESCE(?, published_date) WHERE id = ?`,
      [status, publishedDate, id]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'update_status', id, `Changed blog status to: ${status}`);

    res.json({
      success: true,
      message: `Blog status updated to ${status}`
    });
  } catch (err) {
    console.error('Error updating blog status:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating blog status',
      error: err.message
    });
  }
});

// =====================================================
// UPLOAD BLOG IMAGE
// =====================================================
router.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded'
      });
    }

    const imageUrl = `/uploads/blogs/${req.file.filename}`;

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