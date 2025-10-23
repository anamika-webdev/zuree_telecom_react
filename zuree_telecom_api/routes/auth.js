/ UPDATED routes/auth.js for MySQL
// =====================================================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getPool } = require('../server');

// POST login
router.post('/login', async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Login ID and password are required',
      });
    }

    const pool = getPool();

    const [users] = await pool.query(
      `SELECT id, login_id as loginId, password, name, email, role
       FROM users
       WHERE login_id = ?`,
      [loginId]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, loginId: user.loginId, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key-here',
      { expiresIn: '24h' }
    );

    // Remove password from user object
    delete user.password;

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user,
    });
  } catch