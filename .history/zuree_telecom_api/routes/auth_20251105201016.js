// zuree_telecom_api/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming this is your user model
const authMiddleware = require('../middleware/auth');

// ** NEW: POST /api/auth/register - User Registration **
router.post('/register', async (req, res) => {
  const { loginId, password } = req.body;

  // Basic validation
  if (!loginId || !password) {
    return res.status(400).json({ success: false, message: 'Please provide loginId and password' });
  }

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ loginId });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // 2. Create new user instance (with default 'user' role)
    user = new User({
      loginId,
      password,
      role: 'user' // Default role for new sign-ups
    });

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Save user to database
    await user.save();

    // 5. Send success response (no token, user must log in)
    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully. Please log in.' 
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /api/auth/login - User Login
router.post('/login', async (req, res) => {
  const { loginId, password } = req.body;

  if (!loginId || !password) {
    return res.status(400).json({ success: false, message: 'Please provide loginId and password' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ loginId });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if user is a regular 'user'
    if (user.role !== 'user') {
      return res.status(403).json({ success: false, message: 'Access denied. Use admin login.' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Create and sign JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        loginId: user.loginId
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' }, // Token expires in 1 day
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: user.id,
            loginId: user.loginId,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// GET /api/auth/me - Get logged-in user's info
router.get('/me', authMiddleware(['user', 'admin', 'super_admin', 'editor']), async (req, res) => {
  try {
    // req.user is set by the authMiddleware
    const user = await User.findById(req.user.id).select('-password'); 
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;