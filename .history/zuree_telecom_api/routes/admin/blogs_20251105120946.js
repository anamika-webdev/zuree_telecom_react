// routes/admin/blogs.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middleware/auth');

// Get pool function
const getPool = () => {
  const { getPool: poolGetter } = require('../../server');
  return poolGetter();
};

// Apply authentication middleware to all routes
router.use(authMiddleware);

// GET all blogs (including drafts)
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const [blogs] = await pool.query(
      `SELECT id, title, url_title, description, img, author, category, status, date, views, created_at
       FROM blogs
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      blogs
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

// GET single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    
    const [blogs] = await pool.query('SELECT * FROM blogs WHERE id = ?', [id]);

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

// CREATE new blog
router.post('/', async (req, res) => {
  try {
    const { title, urlTitle, description, content, author, image, category, tags, status } = req.body;

    if (!title || !urlTitle || !description || !author) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing'
      });
    }

    const pool = getPool();

    const [result] = await pool.query(
      `INSERT INTO blogs (title, url_title, description, content, author, img, category, tags, status, date, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
      [title, urlTitle, description, content || '', author, image || '', category || '', tags || '', status || 'draft', req.user?.id || null]
    );

    res.json({
      success: true,
      message: 'Blog created successfully',
      id: result.insertId
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

// UPDATE blog
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, urlTitle, description, content, author, image, category, tags, status } = req.body;

    const pool = getPool();

    await pool.query(
      `UPDATE blogs 
       SET title = ?, url_title = ?, description = ?, content = ?, 
           author = ?, img = ?, category = ?, tags = ?, status = ?
       WHERE id = ?`,
      [title, urlTitle, description, content, author, image, category, tags, status, id]
    );

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

// DELETE blog
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    await pool.query('DELETE FROM blogs WHERE id = ?', [id]);

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

// UPDATE blog status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pool = getPool();

    await pool.query('UPDATE blogs SET status = ? WHERE id = ?', [status, id]);

    res.json({
      success: true,
      message: 'Blog status updated successfully'
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

module.exports = router;