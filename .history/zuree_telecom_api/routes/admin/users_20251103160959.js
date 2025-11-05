// zuree_telecom_api/routes/admin/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { getPool } = require('../../server');
const { authMiddleware, adminMiddleware } = require('../../middleware/auth');

// Apply authentication and admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// GET all users
router.get('/', async (req, res) => {
  try {
    const pool = getPool();

    const [users] = await pool.query(
      `SELECT id, login_id as loginId, name, email, role, created_at as createdAt
       FROM users
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: err.message,
    });
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const { loginId, name, email, password, role } = req.body;

    if (!loginId || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing',
      });
    }

    const pool = getPool();

    // Check if user already exists
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE login_id = ? OR email = ?',
      [loginId, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User with this login ID or email already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users (login_id, name, email, password, role, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [loginId, name, email, hashedPassword, role || 'admin']
    );

    res.json({
      success: true,
      message: 'User created successfully',
      id: result.insertId,
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: err.message,
    });
  }
});

// UPDATE user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { loginId, name, email, password, role } = req.body;

    const pool = getPool();

    // Check if updating to existing login_id or email
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE (login_id = ? OR email = ?) AND id != ?',
      [loginId, email, id]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User with this login ID or email already exists',
      });
    }

    if (password) {
      // Update with new password
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        `UPDATE users 
         SET login_id = ?, name = ?, email = ?, password = ?, role = ?
         WHERE id = ?`,
        [loginId, name, email, hashedPassword, role, id]
      );
    } else {
      // Update without changing password
      await pool.query(
        `UPDATE users 
         SET login_id = ?, name = ?, email = ?, role = ?
         WHERE id = ?`,
        [loginId, name, email, role, id]
      );
    }

    res.json({
      success: true,
      message: 'User updated successfully',
    });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: err.message,
    });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    // Prevent deleting self
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account',
      });
    }

    await pool.query('DELETE FROM users WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: err.message,
    });
  }
});

module.exports = router;