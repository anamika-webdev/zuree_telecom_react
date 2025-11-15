// =====================================================
// CONTACT ROUTES - COMPLETE VERSION
// File: zuree_telecom_api/routes/contact.js
// =====================================================

const express = require('express');
const router = express.Router();

// Get pool function
const getPool = () => {
  const { getPool: poolGetter } = require('../server');
  return poolGetter();
};

// =====================================================
// GET ALL CONTACT MESSAGES (NEW - FOR DASHBOARD)
// =====================================================
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    
    const [contacts] = await pool.query(
      `SELECT 
        id,
        name,
        email,
        phone,
        subject,
        message,
        status,
        created_at
       FROM contact_messages
       ORDER BY created_at DESC`
    );

    res.json(contacts);
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
// GET SINGLE CONTACT MESSAGE BY ID
// =====================================================
router.get('/:id', async (req, res) => {
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
// POST NEW CONTACT MESSAGE
// =====================================================
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const pool = getPool();

    const [result] = await pool.query(
      `INSERT INTO contact_messages 
       (name, email, phone, subject, message, status, created_at)
       VALUES (?, ?, ?, ?, ?, 'new', NOW())`,
      [name, email, phone || '', subject || '', message]
    );

    res.json({
      success: true,
      message: 'Message sent successfully',
      contactId: result.insertId
    });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: err.message
    });
  }
});

// =====================================================
// UPDATE CONTACT STATUS (Optional - for admin use)
// =====================================================
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const pool = getPool();

    const [result] = await pool.query(
      'UPDATE contact_messages SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully'
    });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: err.message
    });
  }
});

module.exports = router;