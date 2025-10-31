// routes/contact.js - Simple version without email
const express = require('express');
const router = express.Router();
const { getPool } = require('../server');

// POST - Submit contact form
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

    // Save to database
    await pool.query(
      `INSERT INTO contact_messages (name, email, phone, subject, message, status)
       VALUES (?, ?, ?, ?, ?, 'new')`,
      [name, email, phone || null, subject || null, message]
    );

    res.status(201).json({
      success: true,
      message: 'Message received successfully. We will contact you soon.'
    });

  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({
      success: false,
      message: 'Error submitting message',
      error: err.message
    });
  }
});

// GET - Get all contact messages (admin only - add auth later)
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    
    const [messages] = await pool.query(
      `SELECT * FROM contact_messages ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      messages
    });

  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: err.message
    });
  }
});

module.exports = router;