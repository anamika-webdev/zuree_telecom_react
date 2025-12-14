// routes/blogs.js - Public Blogs API
const express = require('express');
const router = express.Router();
const { getPool } = require('../server');

// GET all published blogs (public endpoint)
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const category = req.query.category || 'all';
    const search = req.query.search || '';

    let whereClause = "status = 'published'";
    const params = [];

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
        id, title, url_title, author, category, description as excerpt,
        img as featured_image, date as published_date, views, tags,
        created_at, updated_at
       FROM blogs
       WHERE ${whereClause}
       ORDER BY created_at DESC
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

// GET single blog by ID or URL title (public endpoint)
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    const pool = getPool();

    // Check if identifier is a number (ID) or string (URL title)
    const isId = !isNaN(identifier);
    const query = isId
      ? 'SELECT * FROM blogs WHERE id = ? AND status = ?'
      : 'SELECT * FROM blogs WHERE url_title = ? AND status = ?';

    const [blogs] = await pool.query(query, [identifier, 'published']);

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment view count
    await pool.query(
      'UPDATE blogs SET views = views + 1 WHERE id = ?',
      [blogs[0].id]
    );

    res.json({
      success: true,
      blog: {
        ...blogs[0],
        excerpt: blogs[0].description,
        featured_image: blogs[0].img,
        published_date: blogs[0].date
      }
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

// GET blog categories (public endpoint)
router.get('/meta/categories', async (req, res) => {
  try {
    const pool = getPool();
    const [categories] = await pool.query(
      `SELECT DISTINCT category, COUNT(*) as count
       FROM blogs
       WHERE status = 'published' AND category IS NOT NULL
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

module.exports = router;