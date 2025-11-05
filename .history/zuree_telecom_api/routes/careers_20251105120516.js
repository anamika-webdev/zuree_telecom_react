// routes/careers.js
const express = require('express');
const router = express.Router();

// Get pool function
const getPool = () => {
  const { getPool: poolGetter } = require('../server');
  return poolGetter();
};

// GET all active jobs
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

// GET single job
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

// POST job application
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

    await pool.query(
      `INSERT INTO job_applications 
       (job_id, name, email, phone, resume_path, cover_letter, status, applied_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())`,
      [jobId, name, email, phone, resumePath || '', coverLetter || '']
    );

    res.json({
      success: true,
      message: 'Application submitted successfully'
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