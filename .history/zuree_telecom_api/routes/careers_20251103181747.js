// UPDATED routes/careers.js for MySQL
// =====================================================

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Get pool function - this will be available after server.js exports it
const getPool = () => {
  const { getPool: poolGetter } = require('../server');
  return poolGetter();
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only PDF and DOC files are allowed'));
  },
});

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const pool = getPool();

    const [jobs] = await pool.query(
      `SELECT id, title, location, type, description, 
              requirements, posted_date as postedDate, status
       FROM jobs
       WHERE status = 'active'
       ORDER BY posted_date DESC`
    );

    res.json({
      success: true,
      jobs,
    });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: err.message,
    });
  }
});

// GET job by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [jobs] = await pool.query(
      `SELECT id, title, location, type, description, 
              requirements, posted_date as postedDate, status
       FROM jobs
       WHERE id = ?`,
      [id]
    );

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.json({
      success: true,
      job: jobs[0],
    });
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: err.message,
    });
  }
});

// POST job application
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const { jobId, name, email, phone, coverLetter } = req.body;
    const resumePath = req.file ? req.file.path : null;

    if (!resumePath) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required',
      });
    }

    const pool = getPool();

    await pool.query(
      `INSERT INTO job_applications 
       (job_id, name, email, phone, resume_path, cover_letter)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [jobId, name, email, phone, resumePath, coverLetter]
    );

    res.json({
      success: true,
      message: 'Application submitted successfully',
    });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: err.message,
    });
  }
});

module.exports = router;