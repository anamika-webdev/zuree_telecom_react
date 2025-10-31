// =====================================================
// UPDATED SERVER.JS WITH ADMIN ROUTES
// server.js
// =====================================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create upload directories if they don't exist
const uploadDirs = [
  'uploads/blogs',
  'uploads/services',
  'uploads/resumes',
  'uploads/team'
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

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
    console.log('✅ Connected to MySQL database');
    connection.release();
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
};

// Get pool instance
const getPool = () => {
  if (!pool) {
    throw new Error('Database pool not initialized');
  }
  return pool;
};

// =====================================================
// PUBLIC ROUTES (User-facing website)
// =====================================================
const blogsRoutes = require('./routes/blogs');
const careersRoutes = require('./routes/careers');
const contactRoutes = require('./routes/contact');

app.use('/api/blogs', blogsRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/contact', contactRoutes);

// =====================================================
// ADMIN ROUTES
// =====================================================
const { router: adminAuthRoutes } = require('./routes/admin/auth');
const adminBlogsRoutes = require('./routes/admin/blogs');
const adminServicesRoutes = require('./routes/admin/services');
const adminJobsRoutes = require('./routes/admin/jobs');
const adminDashboardRoutes = require('./routes/admin/dashboard');

app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/blogs', adminBlogsRoutes);
app.use('/api/admin/services', adminServicesRoutes);
app.use('/api/admin/jobs', adminJobsRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);

// =====================================================
// HEALTH CHECK ENDPOINT
// =====================================================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: 'MySQL',
    timestamp: new Date()
  });
});

// =====================================================
// ERROR HANDLING MIDDLEWARE
// =====================================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// =====================================================
// 404 HANDLER
// =====================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// =====================================================
// START SERVER
// =====================================================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}/api`);
    console.log(`🔒 Admin API: http://localhost:${PORT}/api/admin`);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  pool.end();
  process.exit(1);
});

// Export pool for use in routes
module.exports = { getPool };