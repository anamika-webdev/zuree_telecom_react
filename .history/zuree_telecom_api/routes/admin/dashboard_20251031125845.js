// =====================================================
// ADMIN DASHBOARD ROUTES
// routes/admin/dashboard.js
// =====================================================

const express = require('express');
const router = express.Router();
const { getPool } = require('../../server');
const { verifyToken } = require('./auth');

// =====================================================
// GET DASHBOARD OVERVIEW STATISTICS
// =====================================================
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const pool = getPool();

    // Get all stats in parallel
    const [
      [blogStats],
      [jobStats],
      [applicationStats],
      [serviceStats],
      [messageStats],
      [recentActivity]
    ] = await Promise.all([
      // Blog statistics
      pool.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
          SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as drafts,
          SUM(views) as total_views
        FROM blogs
      `),
      
      // Job statistics
      pool.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
          SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as closed,
          SUM(openings) as total_openings
        FROM jobs
      `),
      
      // Application statistics
      pool.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
          SUM(CASE WHEN status = 'reviewing' THEN 1 ELSE 0 END) as reviewing,
          SUM(CASE WHEN status = 'shortlisted' THEN 1 ELSE 0 END) as shortlisted,
          SUM(CASE WHEN status = 'hired' THEN 1 ELSE 0 END) as hired
        FROM job_applications
      `),
      
      // Service statistics
      pool.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active
        FROM services
      `),
      
      // Message statistics
      pool.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_messages,
          SUM(CASE WHEN status = 'read' THEN 1 ELSE 0 END) as read,
          SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as replied
        FROM contact_messages
      `),
      
      // Recent activity
      pool.query(`
        SELECT 
          l.action,
          l.entity_type,
          l.entity_id,
          l.details,
          l.created_at,
          a.full_name as admin_name
        FROM admin_activity_log l
        JOIN admin_users a ON l.admin_id = a.id
        ORDER BY l.created_at DESC
        LIMIT 10
      `)
    ]);

    res.json({
      success: true,
      stats: {
        blogs: blogStats[0],
        jobs: jobStats[0],
        applications: applicationStats[0],
        services: serviceStats[0],
        messages: messageStats[0]
      },
      recentActivity
    });
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: err.message
    });
  }
});

// =====================================================
// GET BLOG ANALYTICS
// =====================================================
router.get('/blog-analytics', verifyToken, async (req, res) => {
  try {
    const pool = getPool();
    const days = parseInt(req.query.days) || 30;

    const [blogTrends] = await pool.query(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count,
        status
      FROM blogs
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      GROUP BY DATE(created_at), status
      ORDER BY date DESC
    `, [days]);

    const [topBlogs] = await pool.query(`
      SELECT 
        id, title, views, date, author
      FROM blogs
      WHERE status = 'published'
      ORDER BY views DESC
      LIMIT 10
    `);

    const [categoryDistribution] = await pool.query(`
      SELECT 
        category,
        COUNT(*) as count
      FROM blogs
      WHERE category IS NOT NULL
      GROUP BY category
      ORDER BY count DESC
    `);

    res.json({
      success: true,
      blogTrends,
      topBlogs,
      categoryDistribution
    });
  } catch (err) {
    console.error('Error fetching blog analytics:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog analytics',
      error: err.message
    });
  }
});

// =====================================================
// GET JOB ANALYTICS
// =====================================================
router.get('/job-analytics', verifyToken, async (req, res) => {
  try {
    const pool = getPool();

    const [applicationTrends] = await pool.query(`
      SELECT 
        DATE(applied_at) as date,
        COUNT(*) as count,
        status
      FROM job_applications
      WHERE applied_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE(applied_at), status
      ORDER BY date DESC
    `);

    const [jobsByLocation] = await pool.query(`
      SELECT 
        location,
        COUNT(*) as count,
        SUM(openings) as total_openings
      FROM jobs
      WHERE status = 'active'
      GROUP BY location
      ORDER BY count DESC
      LIMIT 10
    `);

    const [jobsByDepartment] = await pool.query(`
      SELECT 
        department,
        COUNT(*) as count
      FROM jobs
      WHERE status = 'active' AND department IS NOT NULL
      GROUP BY department
      ORDER BY count DESC
    `);

    const [topJobs] = await pool.query(`
      SELECT 
        j.id, j.title, j.location, j.posted_date,
        COUNT(ja.id) as application_count
      FROM jobs j
      LEFT JOIN job_applications ja ON j.id = ja.job_id
      WHERE j.status = 'active'
      GROUP BY j.id
      ORDER BY application_count DESC
      LIMIT 10
    `);

    res.json({
      success: true,
      applicationTrends,
      jobsByLocation,
      jobsByDepartment,
      topJobs
    });
  } catch (err) {
    console.error('Error fetching job analytics:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching job analytics',
      error: err.message
    });
  }
});

// =====================================================
// GET CONTACT MESSAGES (Recent)
// =====================================================
router.get('/recent-messages', verifyToken, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const pool = getPool();

    const [messages] = await pool.query(`
      SELECT 
        id, name, email, subject, message, status, created_at
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT ?
    `, [limit]);

    res.json({
      success: true,
      messages
    });
  } catch (err) {
    console.error('Error fetching recent messages:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent messages',
      error: err.message
    });
  }
});

// =====================================================
// GET SYSTEM HEALTH
// =====================================================
router.get('/system-health', verifyToken, async (req, res) => {
  try {
    const pool = getPool();

    // Check database connection
    const [dbCheck] = await pool.query('SELECT 1');
    
    // Get database size
    const [dbSize] = await pool.query(`
      SELECT 
        table_schema as database_name,
        SUM(data_length + index_length) / 1024 / 1024 as size_mb
      FROM information_schema.tables
      WHERE table_schema = DATABASE()
      GROUP BY table_schema
    `);

    // Get table counts
    const [tableCounts] = await pool.query(`
      SELECT 
        'blogs' as table_name, COUNT(*) as count FROM blogs
      UNION ALL
      SELECT 'jobs', COUNT(*) FROM jobs
      UNION ALL
      SELECT 'job_applications', COUNT(*) FROM job_applications
      UNION ALL
      SELECT 'services', COUNT(*) FROM services
      UNION ALL
      SELECT 'contact_messages', COUNT(*) FROM contact_messages
      UNION ALL
      SELECT 'admin_users', COUNT(*) FROM admin_users
    `);

    res.json({
      success: true,
      health: {
        database: dbCheck ? 'connected' : 'disconnected',
        databaseSize: dbSize[0]?.size_mb || 0,
        tables: tableCounts
      },
      timestamp: new Date()
    });
  } catch (err) {
    console.error('Error checking system health:', err);
    res.status(500).json({
      success: false,
      message: 'Error checking system health',
      error: err.message
    });
  }
});

module.exports = router;