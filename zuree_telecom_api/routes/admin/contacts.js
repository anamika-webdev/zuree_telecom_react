// =====================================================
// ADMIN CONTACTS MANAGEMENT ROUTES - COMPLETE VERSION
// File: zuree_telecom_api/routes/admin/contacts.js
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
       VALUES (?, ?, 'contact', ?, ?)`,
            [adminId, action, entityId, details]
        );
    } catch (err) {
        console.error('Error logging activity:', err);
    }
}

// =====================================================
// GET ALL CONTACT MESSAGES
// =====================================================
router.get('/', verifyToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const status = req.query.status || 'all';
        const search = req.query.search || '';

        const pool = getPool();

        // Build WHERE clause
        let whereClause = '1=1';
        const params = [];

        if (status !== 'all') {
            whereClause += ' AND status = ?';
            params.push(status);
        }

        if (search) {
            whereClause += ' AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)';
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm, searchTerm);
        }

        // Get total count
        const [countResult] = await pool.query(
            `SELECT COUNT(*) as total FROM contact_messages WHERE ${whereClause}`,
            params
        );
        const totalCount = countResult[0].total;
        const totalPages = Math.ceil(totalCount / limit);

        // Get contact messages
        const [contacts] = await pool.query(
            `SELECT 
        id, name, email, phone, subject, message, status, created_at
       FROM contact_messages
       WHERE ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        res.json({
            success: true,
            contacts,
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
                limit
            }
        });
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact messages',
            error: err.message
        });
    }
});

// =====================================================
// GET CONTACT STATISTICS
// =====================================================
router.get('/stats', verifyToken, async (req, res) => {
    try {
        const pool = getPool();

        // Get overall statistics
        const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count,
        SUM(CASE WHEN status = 'read' THEN 1 ELSE 0 END) as read_count,
        SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as replied_count,
        SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archived_count,
        SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) as today,
        SUM(CASE WHEN WEEK(created_at) = WEEK(CURDATE()) THEN 1 ELSE 0 END) as this_week
      FROM contact_messages
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
// GET SINGLE CONTACT MESSAGE BY ID
// =====================================================
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();

        const [contacts] = await pool.query(
            'SELECT * FROM contact_messages WHERE id = ?',
            [id]
        );

        if (contacts.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found'
            });
        }

        // Auto-mark as read if it's new
        if (contacts[0].status === 'new') {
            await pool.query(
                'UPDATE contact_messages SET status = ? WHERE id = ?',
                ['read', id]
            );
            contacts[0].status = 'read';
        }

        res.json({
            success: true,
            contact: contacts[0]
        });
    } catch (err) {
        console.error('Error fetching contact:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact message',
            error: err.message
        });
    }
});

// =====================================================
// UPDATE CONTACT STATUS
// =====================================================
router.patch('/:id/status', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['new', 'read', 'replied', 'archived'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be: new, read, replied, or archived'
            });
        }

        const pool = getPool();

        // Check if contact exists
        const [existing] = await pool.query(
            'SELECT name, email FROM contact_messages WHERE id = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found'
            });
        }

        // Update status
        await pool.query(
            'UPDATE contact_messages SET status = ? WHERE id = ?',
            [status, id]
        );

        // Log activity
        await logActivity(
            pool,
            req.adminId,
            'update_status',
            id,
            `Changed contact status to ${status} for ${existing[0].name} (${existing[0].email})`
        );

        res.json({
            success: true,
            message: `Contact status updated to ${status}`
        });
    } catch (err) {
        console.error('Error updating contact status:', err);
        res.status(500).json({
            success: false,
            message: 'Error updating contact status',
            error: err.message
        });
    }
});

// =====================================================
// DELETE CONTACT MESSAGE
// =====================================================
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();

        // Check if contact exists
        const [existing] = await pool.query(
            'SELECT name, email FROM contact_messages WHERE id = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found'
            });
        }

        // Delete contact
        await pool.query('DELETE FROM contact_messages WHERE id = ?', [id]);

        // Log activity
        await logActivity(
            pool,
            req.adminId,
            'delete',
            id,
            `Deleted contact message from ${existing[0].name} (${existing[0].email})`
        );

        res.json({
            success: true,
            message: 'Contact message deleted successfully'
        });
    } catch (err) {
        console.error('Error deleting contact:', err);
        res.status(500).json({
            success: false,
            message: 'Error deleting contact message',
            error: err.message
        });
    }
});

// =====================================================
// BULK UPDATE CONTACT STATUS
// =====================================================
router.post('/bulk-update', verifyToken, async (req, res) => {
    try {
        const { contactIds, status } = req.body;

        if (!Array.isArray(contactIds) || contactIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Contact IDs must be a non-empty array'
            });
        }

        if (!['new', 'read', 'replied', 'archived'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const pool = getPool();

        // Update all contacts
        const placeholders = contactIds.map(() => '?').join(',');
        await pool.query(
            `UPDATE contact_messages SET status = ? WHERE id IN (${placeholders})`,
            [status, ...contactIds]
        );

        // Log activity
        await logActivity(
            pool,
            req.adminId,
            'bulk_update',
            null,
            `Bulk updated ${contactIds.length} contacts to ${status}`
        );

        res.json({
            success: true,
            message: `${contactIds.length} contacts updated to ${status}`
        });
    } catch (err) {
        console.error('Error bulk updating contacts:', err);
        res.status(500).json({
            success: false,
            message: 'Error bulk updating contacts',
            error: err.message
        });
    }
});

// =====================================================
// BULK DELETE CONTACTS
// =====================================================
router.post('/bulk-delete', verifyToken, async (req, res) => {
    try {
        const { contactIds } = req.body;

        if (!Array.isArray(contactIds) || contactIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Contact IDs must be a non-empty array'
            });
        }

        const pool = getPool();

        // Delete all contacts
        const placeholders = contactIds.map(() => '?').join(',');
        await pool.query(
            `DELETE FROM contact_messages WHERE id IN (${placeholders})`,
            contactIds
        );

        // Log activity
        await logActivity(
            pool,
            req.adminId,
            'bulk_delete',
            null,
            `Bulk deleted ${contactIds.length} contact messages`
        );

        res.json({
            success: true,
            message: `${contactIds.length} contacts deleted successfully`
        });
    } catch (err) {
        console.error('Error bulk deleting contacts:', err);
        res.status(500).json({
            success: false,
            message: 'Error bulk deleting contacts',
            error: err.message
        });
    }
});

module.exports = router;
