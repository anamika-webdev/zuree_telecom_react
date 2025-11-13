// ============================================
// BACKEND FIX: Add Active Team Members Endpoint
// File: backend/routes/team.js (or wherever your team routes are)
// ============================================

// ADD THIS NEW ROUTE to your existing team routes file:

// Get active team members only (for public display)
router.get('/active', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, name, position, department, email, phone, bio, 
              image_url, linkedin, twitter, status, created_at 
       FROM team_members 
       WHERE status = 'active' 
       ORDER BY id ASC`
    );
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching active team members:', error);
    res.status(500).json({ 
      error: 'Failed to fetch active team members',
      message: error.message 
    });
  }
});

// ============================================
// COMPLETE TEAM ROUTES FILE EXAMPLE
// ============================================

const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Adjust path as needed
const auth = require('../middleware/auth'); // Your auth middleware

// Get all team members (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM team_members ORDER BY id DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// Get active team members only (PUBLIC - no auth needed)
router.get('/active', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, name, position, department, email, phone, bio, 
              image_url, linkedin, twitter, status, created_at 
       FROM team_members 
       WHERE status = 'active' 
       ORDER BY id ASC`
    );
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching active team members:', error);
    res.status(500).json({ 
      error: 'Failed to fetch active team members',
      message: error.message 
    });
  }
});

// Get single team member by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM team_members WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
});

// Create new team member
router.post('/', auth, async (req, res) => {
  try {
    const { name, position, department, email, phone, bio, image_url, linkedin, twitter, status } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO team_members 
       (name, position, department, email, phone, bio, image_url, linkedin, twitter, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, position, department, email, phone, bio, image_url, linkedin, twitter, status || 'active']
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Team member created successfully' 
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
});

// Update team member
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, position, department, email, phone, bio, image_url, linkedin, twitter, status } = req.body;
    
    await db.query(
      `UPDATE team_members 
       SET name = ?, position = ?, department = ?, email = ?, 
           phone = ?, bio = ?, image_url = ?, linkedin = ?, twitter = ?, status = ?
       WHERE id = ?`,
      [name, position, department, email, phone, bio, image_url, linkedin, twitter, status, req.params.id]
    );
    
    res.json({ message: 'Team member updated successfully' });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

// Delete team member
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM team_members WHERE id = ?', [req.params.id]);
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

module.exports = router;

// ============================================
// IMPORTANT: Make sure this route is registered in your main app file
// ============================================

// In your server.js or app.js:
// const teamRoutes = require('./routes/team');
// app.use('/api/team', teamRoutes);