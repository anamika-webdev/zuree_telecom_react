// =====================================================
// ADMIN AUTHENTICATION ROUTES
// routes/admin/auth.js
// =====================================================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getPool } = require('../../server');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'No token provided'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.adminId = decoded.id;
    req.adminRole = decoded.role;
    next();
  });
};

// Middleware to check if user is super admin
const isSuperAdmin = (req, res, next) => {
  if (req.adminRole !== 'super_admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Super admin privileges required.'
    });
  }
  next();
};

// =====================================================
// LOGIN
// =====================================================
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const pool = getPool();
    
    // Find user by username or email
    const [users] = await pool.query(
      `SELECT id, username, email, password, full_name, role, status 
       FROM admin_users 
       WHERE (username = ? OR email = ?) AND status = 'active'`,
      [username, username]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    await pool.query(
      'UPDATE admin_users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Log activity
    await pool.query(
      `INSERT INTO admin_activity_log (admin_id, action, details, ip_address) 
       VALUES (?, 'login', 'User logged in', ?)`,
      [user.id, req.ip]
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: err.message
    });
  }
});

// =====================================================
// GET CURRENT USER
// =====================================================
router.get('/me', verifyToken, async (req, res) => {
  try {
    const pool = getPool();
    
    const [users] = await pool.query(
      `SELECT id, username, email, full_name, role, last_login, created_at 
       FROM admin_users 
       WHERE id = ?`,
      [req.adminId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: users[0].id,
        username: users[0].username,
        email: users[0].email,
        fullName: users[0].full_name,
        role: users[0].role,
        lastLogin: users[0].last_login,
        createdAt: users[0].created_at
      }
    });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
      error: err.message
    });
  }
});

// =====================================================
// CHANGE PASSWORD
// =====================================================
router.post('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    const pool = getPool();
    
    // Get current password
    const [users] = await pool.query(
      'SELECT password FROM admin_users WHERE id = ?',
      [req.adminId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, users[0].password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await pool.query(
      'UPDATE admin_users SET password = ? WHERE id = ?',
      [hashedPassword, req.adminId]
    );

    // Log activity
    await pool.query(
      `INSERT INTO admin_activity_log (admin_id, action, details) 
       VALUES (?, 'password_change', 'Password changed successfully')`,
      [req.adminId]
    );

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: err.message
    });
  }
});

// =====================================================
// LOGOUT
// =====================================================
router.post('/logout', verifyToken, async (req, res) => {
  try {
    const pool = getPool();
    
    // Log activity
    await pool.query(
      `INSERT INTO admin_activity_log (admin_id, action, details) 
       VALUES (?, 'logout', 'User logged out')`,
      [req.adminId]
    );

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({
      success: false,
      message: 'Error during logout',
      error: err.message
    });
  }
});

module.exports = { router, verifyToken, isSuperAdmin };