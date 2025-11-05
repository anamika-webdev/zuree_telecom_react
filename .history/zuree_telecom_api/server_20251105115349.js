// server.js - Complete Fixed Version with Admin Auth Routes
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'zuree_telecom_react',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
let pool;

// Connect to database
const connectDB = async () => {
  try {
    pool = mysql.createPool(dbConfig);
    
    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database:', dbConfig.database);
    connection.release();
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
};

// Get pool instance - Export this before requiring routes
const getPool = () => {
  if (!pool) {
    throw new Error('Database pool not initialized');
  }
  return pool;
};

// Export getPool first before requiring any routes
module.exports = { getPool };

// Now require routes after exporting getPool
const blogsRoutes = require('./routes/blogs');
const careersRoutes = require('./routes/careers');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');

// Admin routes
const adminAuthRoutes = require('./routes/admin/auth');
const adminBlogsRoutes = require('./routes/admin/blogs');
const adminUsersRoutes = require('./routes/admin/users');

// Public API Routes
app.use('/api/blogs', blogsRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Admin API Routes - IMPORTANT: These were missing!
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/blogs', adminBlogsRoutes);
app.use('/api/admin/users', adminUsersRoutes);

console.log('✅ All routes loaded including admin auth');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: dbConfig.database,
    routes: {
      public: ['/api/blogs', '/api/careers', '/api/contact', '/api/auth'],
      admin: ['/api/admin/auth', '/api/admin/blogs', '/api/admin/users']
    }
  });
});

// Test endpoint to check admin routes
app.get('/api/admin/test', (req, res) => {
  res.json({ 
    message: 'Admin routes are working',
    availableEndpoints: [
      'POST /api/admin/auth/login',
      'GET /api/admin/auth/me',
      'POST /api/admin/auth/change-password'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
    hint: 'Check /api/health for available routes'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔐 Admin login: http://localhost:${PORT}/api/admin/auth/login`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();