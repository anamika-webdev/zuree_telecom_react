// =====================================================
// CAREERS ROUTES - COMPLETE VERSION
// File: zuree_telecom_api/routes/careers.js
// =====================================================

const express = require('express');
const router = express.Router();

// Get pool function
const getPool = () => {
  const { getPool: poolGetter } = require('../server');
  return poolGetter();
};

// =====================================================
// GET ALL ACTIVE JOBS
// =====================================================
router.get('/jobs', async (req, res) => {
  try {
    const pool = getPool();
    const [jobs] = await pool.query(
      `SELECT * FROM jobs WHERE status = 'active' ORDER BY posted_date DESC`
    );

    res.json({
      success: true,
      jobs
    });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: err.message
    });
  }
});

// =====================================================
// GET SINGLE JOB BY ID
// =====================================================
router.get('/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    
    const [jobs] = await pool.query(
      'SELECT * FROM jobs WHERE id = ? AND status = "active"',
      [id]
    );

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      job: jobs[0]
    });
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: err.message
    });
  }
});

// =====================================================
// GET ALL APPLICATIONS (NEW - FOR DASHBOARD)
// =====================================================
router.get('/applications', async (req, res) => {
  try {
    const pool = getPool();
    
    // Get applications with job details
    const [applications] = await pool.query(
      `SELECT 
        a.id,
        a.job_id,
        a.name,
        a.email,
        a.phone,
        a.resume_path,
        a.cover_letter,
        a.status,
        a.applied_at as applied_date,
        j.title as job_title,
        j.department
       FROM job_applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       ORDER BY a.applied_at DESC`
    );

    res.json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: err.message
    });
  }
});

// =====================================================
// GET SINGLE APPLICATION BY ID
// =====================================================
router.get('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    
    const [applications] = await pool.query(
      `SELECT 
        a.*,
        j.title as job_title,
        j.department,
        j.location
       FROM job_applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       WHERE a.id = ?`,
      [id]
    );

    if (applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      application: applications[0]
    });
  } catch (err) {
    console.error('Error fetching application:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching application',
      error: err.message
    });
  }
});

// =====================================================
// POST JOB APPLICATION
// =====================================================
router.post('/apply', async (req, res) => {
  try {
    const { jobId, name, email, phone, coverLetter, resumePath } = req.body;

    if (!jobId || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing'
      });
    }

    const pool = getPool();

    const [result] = await pool.query(
      `INSERT INTO job_applications 
       (job_id, name, email, phone, resume_path, cover_letter, status, applied_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())`,
      [jobId, name, email, phone, resumePath || '', coverLetter || '']
    );

    res.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: result.insertId
    });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: err.message
    });
  }
});

module.exports = router;