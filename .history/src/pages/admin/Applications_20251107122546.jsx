// zuree_telecom_api/routes/admin/applications.js - COMPLETE VERSION
const express = require('express');
const router = express.Router();

const getPool = () => {
  const { getPool: poolGetter } = require('../../server');
  return poolGetter();
};

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
    next();
  });
};

router.use(verifyToken);

// GET ALL APPLICATIONS
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status || 'all';
    const jobId = req.query.jobId || null;

    const pool = getPool();

    let whereClause = '1=1';
    const params = [];

    if (status !== 'all') {
      whereClause += ' AND a.status = ?';
      params.push(status);
    }

    if (jobId) {
      whereClause += ' AND a.job_id = ?';
      params.push(jobId);
    }

    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM applications a WHERE ${whereClause}`,
      params
    );
    const totalCount = countResult[0].total;

    const [applications] = await pool.query(
      `SELECT 
        a.*,
        j.title as job_title,
        j.location as job_location
       FROM applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       WHERE ${whereClause}
       ORDER BY a.applied_date DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      applications,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: err.message
    });
  }
});

// GET SINGLE APPLICATION
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [applications] = await pool.query(
      `SELECT 
        a.*,
        j.title as job_title,
        j.location as job_location,
        j.department
       FROM applications a
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

// UPDATE APPLICATION STATUS
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const pool = getPool();

    await pool.query(
      'UPDATE applications SET status = ? WHERE id = ?',
      [status, id]
    );

    res.json({
      success: true,
      message: 'Application status updated successfully'
    });
  } catch (err) {
    console.error('Error updating application status:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating application status',
      error: err.message
    });
  }
});

// DELETE APPLICATION
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [existing] = await pool.query('SELECT * FROM applications WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    await pool.query('DELETE FROM applications WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting application:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting application',
      error: err.message
    });
  }
});

// BULK UPDATE STATUS
router.post('/bulk-status', async (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid IDs array'
      });
    }

    const pool = getPool();
    const placeholders = ids.map(() => '?').join(',');

    await pool.query(
      `UPDATE applications SET status = ? WHERE id IN (${placeholders})`,
      [status, ...ids]
    );

    res.json({
      success: true,
      message: `${ids.length} applications updated successfully`
    });
  } catch (err) {
    console.error('Error bulk updating applications:', err);
    res.status(500).json({
      success: false,
      message: 'Error bulk updating applications',
      error: err.message
    });
  }
});

module.exports = router;