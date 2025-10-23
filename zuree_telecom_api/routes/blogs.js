// UPDATED routes/blogs.js for MySQL
// =====================================================

const express = require('express');
const router = express.Router();
const { getPool } = require('../server');

// GET all blogs with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const offset = (page - 1) * limit;

    const pool = getPool();

    // Get total count
    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM blogs');
    const totalCount = countResult[0].total;
    const totalPages = Math.ceil(totalCount / limit);

    // Get blogs with pagination
    const [blogs] = await pool.query(
      `SELECT id, title, url_title as urlTitle, description, 
              img as image, date, author
       FROM blogs
       ORDER BY date DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({
      success: true,
      blogs,
      currentPage: page,
      totalPages,
      totalCount,
    });
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: err.message,
    });
  }
});

// GET blog by URL title
router.get('/:urlTitle', async (req, res) => {
  try {
    const { urlTitle } = req.params;
    const pool = getPool();

    const [blogs] = await pool.query(
      `SELECT id, title, url_title as urlTitle, description, 
              img as image, date, author
       FROM blogs
       WHERE url_title = ?`,
      [urlTitle]
    );

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.json({
      success: true,
      blog: blogs[0],
    });
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: err.message,
    });
  }
});

// GET recent blogs
router.get('/recent/latest', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const pool = getPool();

    const [blogs] = await pool.query(
      `SELECT id, title, url_title as urlTitle, 
              description, img as image, date, author
       FROM blogs
       ORDER BY date DESC
       LIMIT ?`,
      [limit]
    );

    res.json({
      success: true,
      blogs,
    });
  } catch (err) {
    console.error('Error fetching recent blogs:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent blogs',
      error: err.message,
    });
  }
});

module.exports = router;