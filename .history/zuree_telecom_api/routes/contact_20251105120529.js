// routes/contact.js
const express = require('express');
const router = express.Router();

// Get pool function
const getPool = () => {
  const { getPool: poolGetter } = require('../server');
  return poolGetter();
};

// POST contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    const pool = getPool();

    await pool.query(
      `INSERT INTO contact_messages 
       (name, email, phone, subject, message, status, created_at)
       VALUES (?, ?, ?, ?, ?, 'new', NOW())`,
      [name, email, phone || '', subject || '', message]
    );

    res.json({
      success: true,
      message: 'Message sent successfully'
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

module.exports = router;