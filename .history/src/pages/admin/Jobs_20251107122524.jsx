// zuree_telecom_api/routes/admin/jobs.js - COMPLETE VERSION
const express = require('express');
const router = express.Router();

const getPool = () => {
  const { getPool: poolGetter } = require('../../server');
  return poolGetter();
};

// Middleware for auth - you may need to adjust the path
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'No token provided'
    });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.adminId = decoded.id;
    req.adminRole = decoded.role;
    next();
  });
};

router.use(verifyToken);

// GET ALL JOBS
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status || 'all';
    const search = req.query.search || '';
    const type = req.query.type || 'all';

    const pool = getPool();

    let whereClause = '1=1';
    const params = [];

    if (status !== 'all') {
      whereClause += ' AND j.status = ?';
      params.push(status);
    }

    if (search) {
      whereClause += ' AND (j.title LIKE ? OR j.department LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    if (type !== 'all') {
      whereClause += ' AND j.type = ?';
      params.push(type);
    }

    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM jobs j WHERE ${whereClause}`,
      params
    );
    const totalCount = countResult[0].total;

    const [jobs] = await pool.query(
      `SELECT 
        j.*,
        COUNT(DISTINCT a.id) as application_count
       FROM jobs j
       LEFT JOIN applications a ON j.id = a.job_id
       WHERE ${whereClause}
       GROUP BY j.id
       ORDER BY j.posted_date DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      jobs,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
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

// GET SINGLE JOB
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [jobs] = await pool.query('SELECT * FROM jobs WHERE id = ?', [id]);

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

// CREATE JOB
router.post('/', async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      type,
      experienceLevel,
      description,
      requirements,
      responsibilities,
      qualifications,
      salaryRange,
      closingDate,
      status,
      openings
    } = req.body;

    if (!title || !location) {
      return res.status(400).json({
        success: false,
        message: 'Title and location are required'
      });
    }

    const pool = getPool();

    const [result] = await pool.query(
      `INSERT INTO jobs (
        title, department, location, type, experience_level,
        description, requirements, responsibilities, qualifications,
        salary_range, posted_date, closing_date, status, openings
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?)`,
      [
        title,
        department || null,
        location,
        type || 'Full-time',
        experienceLevel || null,
        description || null,
        requirements || null,
        responsibilities || null,
        qualifications || null,
        salaryRange || null,
        closingDate || null,
        status || 'active',
        openings || 1
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      jobId: result.insertId
    });
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating job',
      error: err.message
    });
  }
});

// UPDATE JOB
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      department,
      location,
      type,
      experienceLevel,
      description,
      requirements,
      responsibilities,
      qualifications,
      salaryRange,
      closingDate,
      status,
      openings
    } = req.body;

    const pool = getPool();

    const [existing] = await pool.query('SELECT * FROM jobs WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    await pool.query(
      `UPDATE jobs SET 
       title = ?, department = ?, location = ?, type = ?,
       experience_level = ?, description = ?, requirements = ?,
       responsibilities = ?, qualifications = ?, salary_range = ?,
       closing_date = ?, status = ?, openings = ?
       WHERE id = ?`,
      [
        title || existing[0].title,
        department !== undefined ? department : existing[0].department,
        location || existing[0].location,
        type || existing[0].type,
        experienceLevel !== undefined ? experienceLevel : existing[0].experience_level,
        description !== undefined ? description : existing[0].description,
        requirements !== undefined ? requirements : existing[0].requirements,
        responsibilities !== undefined ? responsibilities : existing[0].responsibilities,
        qualifications !== undefined ? qualifications : existing[0].qualifications,
        salaryRange !== undefined ? salaryRange : existing[0].salary_range,
        closingDate !== undefined ? closingDate : existing[0].closing_date,
        status || existing[0].status,
        openings !== undefined ? openings : existing[0].openings,
        id
      ]
    );

    res.json({
      success: true,
      message: 'Job updated successfully'
    });
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating job',
      error: err.message
    });
  }
});

// DELETE JOB
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [existing] = await pool.query('SELECT title FROM jobs WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    await pool.query('DELETE FROM jobs WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting job',
      error: err.message
    });
  }
});

// UPDATE JOB STATUS
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pool = getPool();

    await pool.query('UPDATE jobs SET status = ? WHERE id = ?', [status, id]);

    res.json({
      success: true,
      message: 'Job status updated successfully'
    });
  } catch (err) {
    console.error('Error updating job status:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating job status',
      error: err.message
    });
  }
});

module.exports = router;