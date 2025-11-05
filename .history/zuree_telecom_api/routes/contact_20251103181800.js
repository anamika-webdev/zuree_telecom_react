// UPDATED routes/contact.js for MySQL
// =====================================================

const express = require('express');
const router = express.Router();

// Get pool function - this will be available after server.js exports it
const getPool = () => {
  const { getPool: poolGetter } = require('../server');
  return poolGetter();
};

// POST contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing',
      });
    }

    const pool = getPool();

    await pool.query(
      `INSERT INTO contacts (name, email, phone, subject, message, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [name, email, phone || '', subject, message]
    );

    res.json({
      success: true,
      message: 'Contact message sent successfully',
    });
  } catch (err) {
    console.error('Error submitting contact:', err);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact',
      error: err.message,
    });
  }
});

// GET all contacts (for admin)
router.get('/', async (req, res) => {
  try {
    const pool = getPool();

    const [contacts] = await pool.query(
      `SELECT id, name, email, phone, subject, message, 
              status, created_at as createdAt
       FROM contacts
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      contacts,
    });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: err.message,
    });
  }
});

module.exports = router;