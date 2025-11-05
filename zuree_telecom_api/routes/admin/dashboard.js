// zuree_telecom_api/routes/admin/blogs.js - Fixed Version
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middleware/auth');

// Get pool function - this will be available after server.js exports it
const getPool = () => {
  const { getPool: poolGetter } = require('../../server');
  return poolGetter();
};

// Apply authentication middleware to all routes
router.use(authMiddleware);

// CREATE new blog
router.post('/', async (req, res) => {
  try {
    const { title, urlTitle, description, content, author, image, status } = req.body;

    if (!title || !urlTitle || !description || !content || !author) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing',
      });
    }

    const pool = getPool();

    const [result] = await pool.query(
      `INSERT INTO blogs (title, url_title, description, content, author, img, status, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [title, urlTitle, description, content, author, image || '', status || 'draft']
    );

    res.json({
      success: true,
      message: 'Blog created successfully',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: err.message,
    });
  }
});

// UPDATE blog
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, urlTitle, description, content, author, image, status } = req.body;

    const pool = getPool();

    await pool.query(
      `UPDATE blogs 
       SET title = ?, url_title = ?, description = ?, content = ?, 
           author = ?, img = ?, status = ?
       WHERE id = ?`,
      [title, urlTitle, description, content, author, image, status, id]
    );

    res.json({
      success: true,
      message: 'Blog updated successfully',
    });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: err.message,
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
      message: 'Blog deleted successfully',
    });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: err.message,
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
      message: 'Blog status updated successfully',
    });
  } catch (err) {
    console.error('Error updating blog status:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating blog status',
      error: err.message,
    });
  }
});

module.exports = router;