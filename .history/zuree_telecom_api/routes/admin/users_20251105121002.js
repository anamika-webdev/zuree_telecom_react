// routes/admin/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { authMiddleware, adminMiddleware } = require('../../middleware/auth');

// Get pool function
const getPool = () => {
  const { getPool: poolGetter } = require('../../server');
  return poolGetter();
};

// Apply authentication and admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// GET all admin users
router.get('/', async (req, res) => {
  try {
    const pool = getPool();

    const [users] = await pool.query(
      `SELECT id, username, email, full_name, role, status, last_login, created_at
       FROM admin_users
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      users
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: err.message
    });
  }
});

// GET single user
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [users] = await pool.query(
      `SELECT id, username, email, full_name, role, status, last_login, created_at
       FROM admin_users
       WHERE id = ?`,
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: users[0]
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: err.message
    });
  }
});

// CREATE new admin user
router.post('/', async (req, res) => {
  try {
    const { username, email, password, fullName, role } = req.body;

    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing'
      });
    }

    const pool = getPool();

    // Check if user already exists
    const [existing] = await pool.query(
      'SELECT id FROM admin_users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User with this username or email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO admin_users (username, email, password, full_name, role, status)
       VALUES (?, ?, ?, ?, ?, 'active')`,
      [username, email, hashedPassword, fullName, role || 'admin']
    );

    res.json({
      success: true,
      message: 'User created successfully',
      id: result.insertId
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: err.message
    });
  }
});

// UPDATE user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, fullName, role, status, password } = req.body;

    const pool = getPool();

    // Check if updating to existing username or email
    const [existing] = await pool.query(
      'SELECT id FROM admin_users WHERE (username = ? OR email = ?) AND id != ?',
      [username, email, id]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already in use'
      });
    }

    let query = `UPDATE admin_users 
                 SET username = ?, email = ?, full_name = ?, role = ?, status = ?`;
    let params = [username, email, fullName, role, status];

    // If password is provided, hash and update it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += `, password = ?`;
      params.push(hashedPassword);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    await pool.query(query, params);

    res.json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: err.message
    });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    // Prevent deleting yourself
    if (req.user && req.user.id === parseInt(id)) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    await pool.query('DELETE FROM admin_users WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: err.message
    });
  }
});

// UPDATE user status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pool = getPool();

    await pool.query('UPDATE admin_users SET status = ? WHERE id = ?', [status, id]);

    res.json({
      success: true,
      message: 'User status updated successfully'
    });
  } catch (err) {
    console.error('Error updating user status:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating user status',
      error: err.message
    });
  }
});

module.exports = router;