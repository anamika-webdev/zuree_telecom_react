// =====================================================
// ADMIN JOBS/CAREERS MANAGEMENT ROUTES
// routes/admin/jobs.js
// =====================================================

const express = require('express');
const router = express.Router();
const { getPool } = require('../../server');
const { verifyToken } = require('./auth');

// Helper function to log activity
async function logActivity(pool, adminId, action, entityId, details) {
  await pool.query(
    `INSERT INTO admin_activity_log (admin_id, action, entity_type, entity_id, details) 
     VALUES (?, ?, 'job', ?, ?)`,
    [adminId, action, entityId, details]
  );
}

// =====================================================
// GET ALL JOBS
// =====================================================
router.get('/', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status || 'all';
    const search = req.query.search || '';
    const location = req.query.location || '';
    const type = req.query.type || '';

    const pool = getPool();

    // Build WHERE clause
    let whereClause = '1=1';
    const params = [];

    if (status !== 'all') {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      whereClause += ' AND (title LIKE ? OR department LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    if (location) {
      whereClause += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    if (type) {
      whereClause += ' AND type = ?';
      params.push(type);
    }

    // Get total count
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM jobs WHERE ${whereClause}`,
      params
    );
    const totalCount = countResult[0].total;
    const totalPages = Math.ceil(totalCount / limit);

    // Get jobs with application count
    const [jobs] = await pool.query(
      `SELECT 
        j.id, j.title, j.department, j.location, j.type, j.experience_level,
        j.salary_range, j.posted_date, j.closing_date, j.status, j.openings,
        j.created_at, j.updated_at,
        COUNT(ja.id) as application_count,
        a.full_name as created_by_name
       FROM jobs j
       LEFT JOIN job_applications ja ON j.id = ja.job_id
       LEFT JOIN admin_users a ON j.created_by = a.id
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
        currentPage: page,
        totalPages,
        totalCount,
        limit
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

// =====================================================
// GET JOB STATISTICS
// =====================================================
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const pool = getPool();

    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total_jobs,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_jobs,
        SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as closed_jobs,
        SUM(openings) as total_openings,
        (SELECT COUNT(*) FROM job_applications) as total_applications,
        (SELECT COUNT(*) FROM job_applications WHERE status = 'pending') as pending_applications
      FROM jobs
    `);

    res.json({
      success: true,
      stats: stats[0]
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: err.message
    });
  }
});

// =====================================================
// GET SINGLE JOB BY ID
// =====================================================
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [jobs] = await pool.query(
      `SELECT 
        j.*, 
        a.full_name as created_by_name,
        COUNT(ja.id) as application_count
       FROM jobs j
       LEFT JOIN admin_users a ON j.created_by = a.id
       LEFT JOIN job_applications ja ON j.id = ja.job_id
       WHERE j.id = ?
       GROUP BY j.id`,
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
// CREATE NEW JOB
// =====================================================
router.post('/', verifyToken, async (req, res) => {
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
      postedDate,
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

    // Insert job
    const [result] = await pool.query(
      `INSERT INTO jobs 
       (title, department, location, type, experience_level, description,
        requirements, responsibilities, qualifications, salary_range,
        posted_date, closing_date, status, openings, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        postedDate || new Date().toISOString().split('T')[0],
        closingDate || null,
        status || 'active',
        openings || 1,
        req.adminId
      ]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'create', result.insertId, `Created job: ${title}`);

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

// =====================================================
// UPDATE JOB
// =====================================================
router.put('/:id', verifyToken, async (req, res) => {
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
      postedDate,
      closingDate,
      status,
      openings
    } = req.body;

    const pool = getPool();

    // Check if job exists
    const [existing] = await pool.query('SELECT * FROM jobs WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Update job
    await pool.query(
      `UPDATE jobs SET 
       title = ?, department = ?, location = ?, type = ?,
       experience_level = ?, description = ?, requirements = ?,
       responsibilities = ?, qualifications = ?, salary_range = ?,
       posted_date = ?, closing_date = ?, status = ?, openings = ?
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
        postedDate || existing[0].posted_date,
        closingDate !== undefined ? closingDate : existing[0].closing_date,
        status || existing[0].status,
        openings !== undefined ? openings : existing[0].openings,
        id
      ]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'update', id, `Updated job: ${title || existing[0].title}`);

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

// =====================================================
// DELETE JOB
// =====================================================
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    // Check if job exists
    const [existing] = await pool.query('SELECT title FROM jobs WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Delete job (applications will be cascaded)
    await pool.query('DELETE FROM jobs WHERE id = ?', [id]);

    // Log activity
    await logActivity(pool, req.adminId, 'delete', id, `Deleted job: ${existing[0].title}`);

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

// =====================================================
// GET JOB APPLICATIONS
// =====================================================
router.get('/:id/applications', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const status = req.query.status || 'all';
    const pool = getPool();

    let whereClause = 'job_id = ?';
    const params = [id];

    if (status !== 'all') {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    const [applications] = await pool.query(
      `SELECT * FROM job_applications
       WHERE ${whereClause}
       ORDER BY applied_at DESC`,
      params
    );

    res.json({
      success: true,
      applications
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

// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================
router.put('/applications/:applicationId', verifyToken, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, notes } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const validStatuses = ['pending', 'reviewing', 'shortlisted', 'rejected', 'hired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const pool = getPool();

    // Check if application exists
    const [existing] = await pool.query(
      'SELECT * FROM job_applications WHERE id = ?',
      [applicationId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Update application
    await pool.query(
      `UPDATE job_applications SET status = ?, notes = ? WHERE id = ?`,
      [status, notes || existing[0].notes, applicationId]
    );

    // Log activity
    await logActivity(
      pool,
      req.adminId,
      'application_update',
      applicationId,
      `Updated application status to ${status} for ${existing[0].name}`
    );

    res.json({
      success: true,
      message: 'Application status updated successfully'
    });
  } catch (err) {
    console.error('Error updating application:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating application',
      error: err.message
    });
  }
});

// =====================================================
// BULK UPDATE JOB STATUS
// =====================================================
router.post('/bulk-update-status', verifyToken, async (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Job IDs array is required'
      });
    }

    if (!['active', 'closed', 'on-hold'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const pool = getPool();

    // Update status for all selected jobs
    await pool.query(
      `UPDATE jobs SET status = ? WHERE id IN (?)`,
      [status, ids]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'bulk_update', null, `Updated ${ids.length} jobs to ${status}`);

    res.json({
      success: true,
      message: `${ids.length} job(s) updated successfully`
    });
  } catch (err) {
    console.error('Error bulk updating jobs:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating jobs',
      error: err.message
    });
  }
});

module.exports = router;