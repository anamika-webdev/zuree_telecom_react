// routes/admin/dashboard.js
const express = require('express');
const router = express.Router();

// Get pool function
const getPool = () => {
  const { getPool: poolGetter } = require('../../server');
  return poolGetter();
};

// Import auth middleware
const { verifyToken } = require('./auth');

// Apply authentication middleware
router.use(verifyToken);

// =====================================================
// GET DASHBOARD STATS
// =====================================================
router.get('/stats', async (req, res) => {
  try {
    const pool = getPool();
    
    // Get total blogs count
    const [blogCount] = await pool.query(
      'SELECT COUNT(*) as count FROM blogs'
    );
    
    // Get total jobs count
    const [jobCount] = await pool.query(
      'SELECT COUNT(*) as count FROM jobs WHERE status = "active"'
    );
    
    // Get total applications count
    const [applicationCount] = await pool.query(
      'SELECT COUNT(*) as count FROM applications'
    );
    
    // Get total contacts count
    const [contactCount] = await pool.query(
      'SELECT COUNT(*) as count FROM contacts'
    );
    
    // Get recent applications (last 5)
    const [recentApplications] = await pool.query(
      `SELECT 
        a.id,
        a.name as applicant_name,
        j.title as job_title,
        a.applied_date,
        a.status
       FROM applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       ORDER BY a.applied_date DESC
       LIMIT 5`
    );
    
    // Get recent contacts (last 5)
    const [recentContacts] = await pool.query(
      `SELECT id, name, subject, email, created_at
       FROM contacts
       ORDER BY created_at DESC
       LIMIT 5`
    );
    
    // Prepare response
    const stats = {
      totalBlogs: blogCount[0].count,
      totalJobs: jobCount[0].count,
      totalApplications: applicationCount[0].count,
      totalContacts: contactCount[0].count,
      recentApplications: recentApplications.map(app => ({
        id: app.id,
        name: app.applicant_name,
        job: app.job_title,
        date: app.applied_date,
        status: app.status
      })),
      recentContacts: recentContacts.map(contact => ({
        id: contact.id,
        name: contact.name,
        subject: contact.subject,
        date: contact.created_at
      }))
    };
    
    res.json({
      success: true,
      stats
    });
    
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: err.message
    });
  }
});

// =====================================================
// GET RECENT ACTIVITY
// =====================================================
router.get('/activity', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const pool = getPool();
    
    const [activities] = await pool.query(
      `SELECT * FROM admin_activity_log 
       ORDER BY created_at DESC 
       LIMIT ?`,
      [limit]
    );
    
    res.json({
      success: true,
      activities
    });
    
  } catch (err) {
    console.error('Error fetching activity:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching activity',
      error: err.message
    });
  }
});

module.exports = router;