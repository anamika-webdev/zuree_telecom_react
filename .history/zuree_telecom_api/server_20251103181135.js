// server.js - Fixed Version
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
  database: process.env.DB_NAME || 'zuree',
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
    console.log('✅ Connected to MySQL database');
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

// Admin routes (if they exist)
let adminBlogsRoutes, adminUsersRoutes;
try {
  adminBlogsRoutes = require('./routes/admin/blogs');
  adminUsersRoutes = require('./routes/admin/users');
} catch (err) {
  console.log('⚠️  Admin routes not found - skipping');
}

// Public API Routes
app.use('/api/blogs', blogsRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Admin API Routes (if they exist)
if (adminBlogsRoutes && adminUsersRoutes) {
  app.use('/api/admin/blogs', adminBlogsRoutes);
  app.use('/api/admin/users', adminUsersRoutes);
  console.log('🔒 Admin API routes loaded');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: 'MySQL',
    adminEnabled: !!(adminBlogsRoutes && adminUsersRoutes)
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}/api`);
    if (adminBlogsRoutes && adminUsersRoutes) {
      console.log(`🔒 Admin API: http://localhost:${PORT}/api/admin`);
    }
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  if (pool) {
    pool.end();
  }
  process.exit(1);
});