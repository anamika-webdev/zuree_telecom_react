// =====================================================
// ADMIN APPLICATIONS MANAGEMENT ROUTES - COMPLETE VERSION
// File: zuree_telecom_api/routes/admin/applications.js
// =====================================================

const express = require('express');
const router = express.Router();
const { getPool } = require('../../server');
const { verifyToken } = require('./auth');

// Helper function to log activity
async function logActivity(pool, adminId, action, entityId, details) {
    try {
        await pool.query(
            `INSERT INTO admin_activity_log (admin_id, action, entity_type, entity_id, details) 
       VALUES (?, ?, 'application', ?, ?)`,
            [adminId, action, entityId, details]
        );
    } catch (err) {
        console.error('Error logging activity:', err);
    }
}

// =====================================================
// GET ALL JOB APPLICATIONS
// =====================================================
router.get('/', verifyToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const status = req.query.status || 'all';
        const jobId = req.query.jobId || '';
        const search = req.query.search || '';

        const pool = getPool();

        // Build WHERE clause
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

        if (search) {
            whereClause += ' AND (a.name LIKE ? OR a.email LIKE ? OR j.title LIKE ?)';
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm);
        }

        // Get total count
        const [countResult] = await pool.query(
            `SELECT COUNT(*) as total 
       FROM job_applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       WHERE ${whereClause}`,
            params
        );
        const totalCount = countResult[0].total;
        const totalPages = Math.ceil(totalCount / limit);

        // Get applications with job details
        const [applications] = await pool.query(
            `SELECT 
        a.id, a.job_id, a.name, a.email, a.phone, 
        a.resume_path, a.cover_letter, a.status, 
        a.applied_at as applied_date,
        a.created_at, a.updated_at,
        j.title as job_title, j.department, j.location
       FROM job_applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       WHERE ${whereClause}
       ORDER BY a.applied_at DESC
       LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        res.json({
            success: true,
            applications,
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
                limit
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

// =====================================================
// GET APPLICATION STATISTICS
// =====================================================
router.get('/stats', verifyToken, async (req, res) => {
    try {
        const pool = getPool();

        // Get overall statistics
        const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'reviewed' THEN 1 ELSE 0 END) as reviewed,
        SUM(CASE WHEN status = 'shortlisted' THEN 1 ELSE 0 END) as shortlisted,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
        SUM(CASE WHEN DATE(applied_at) = CURDATE() THEN 1 ELSE 0 END) as today,
        SUM(CASE WHEN WEEK(applied_at) = WEEK(CURDATE()) THEN 1 ELSE 0 END) as this_week
      FROM job_applications
    `);

        res.json({
            success: true,
            stats: stats[0]
        });
    } catch (err) {
        console.error('Error fetching statistics:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: err.message
        });
    }
});

// =====================================================
// GET SINGLE APPLICATION BY ID
// =====================================================
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();

        const [applications] = await pool.query(
            `SELECT 
        a.*,
        j.title as job_title,
        j.department,
        j.location,
        j.type as job_type
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
// UPDATE APPLICATION STATUS
// =====================================================
router.patch('/:id/status', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        if (!['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be: pending, reviewed, shortlisted, rejected, or hired'
            });
        }

        const pool = getPool();

        // Get application details
        const [existing] = await pool.query(
            'SELECT a.*, j.title as job_title FROM job_applications a LEFT JOIN jobs j ON a.job_id = j.id WHERE a.id = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Update status
        await pool.query(
            'UPDATE job_applications SET status = ? WHERE id = ?',
            [status, id]
        );

        // Log activity
        await logActivity(
            pool,
            req.adminId,
            'update_status',
            id,
            `Changed application status to ${status} for ${existing[0].name} - ${existing[0].job_title}`
        );

        res.json({
            success: true,
            message: `Application status updated to ${status}`
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

// =====================================================
// DELETE APPLICATION
// =====================================================
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();

        // Check if application exists
        const [existing] = await pool.query(
            'SELECT name, email FROM job_applications WHERE id = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Delete application
        await pool.query('DELETE FROM job_applications WHERE id = ?', [id]);

        // Log activity
        await logActivity(
            pool,
            req.adminId,
            'delete',
            id,
            `Deleted application from ${existing[0].name} (${existing[0].email})`
        );

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

// =====================================================
// BULK UPDATE APPLICATION STATUS
// =====================================================
router.post('/bulk-update', verifyToken, async (req, res) => {
    try {
        const { applicationIds, status } = req.body;

        if (!Array.isArray(applicationIds) || applicationIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Application IDs must be a non-empty array'
            });
        }

        if (!['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const pool = getPool();

        // Update all applications
        const placeholders = applicationIds.map(() => '?').join(',');
        await pool.query(
            `UPDATE job_applications SET status = ? WHERE id IN (${placeholders})`,
            [status, ...applicationIds]
        );

        // Log activity
        await logActivity(
            pool,
            req.adminId,
            'bulk_update',
            null,
            `Bulk updated ${applicationIds.length} applications to ${status}`
        );

        res.json({
            success: true,
            message: `${applicationIds.length} applications updated to ${status}`
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
