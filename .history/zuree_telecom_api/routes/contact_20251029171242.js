// UPDATED routes/contact.js for MySQL
// =====================================================

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { getPool } = require('../server');

// Email transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// POST contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const pool = getPool();

    await pool.query(
      `INSERT INTO contacts (name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, subject, message]
    );

    // Send email notification
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || 'info@zureetelecom.com',
        subject: `New Contact Form: ${subject}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
    } catch (emailErr) {
      console.error('Error sending email:', emailErr);
    }

    res.json({
      success: true,
      message: 'Contact form submitted successfully',
    });
  } catch (err) {
    console.error('Error submitting contact form:', err);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: err.message,
    });
  }
});

// POST newsletter subscription
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const pool = getPool();

    // Check if already subscribed
    const [existing] = await pool.query(
      'SELECT id FROM newsletter_subscribers WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already subscribed',
      });
    }

    // Subscribe
    await pool.query(
      'INSERT INTO newsletter_subscribers (email) VALUES (?)',
      [email]
    );

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (err) {
    console.error('Error subscribing to newsletter:', err);
    res.status(500).json({
      success: false,
      message: 'Error subscribing to newsletter',
      error: err.message,
    });
  }
});

module.exports = router;