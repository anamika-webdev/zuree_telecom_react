// =====================================================
// SERVER.JS - COMPLETE VERSION WITH ALL ROUTES
// File: zuree_telecom_api/server.js
// =====================================================

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// =====================================================
// DATABASE CONFIGURATION
// =====================================================
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'zuree_telecom_react',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

const connectDB = async () => {
  try {
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database Connected Successfully');
    console.log(`📊 Database: ${dbConfig.database}`);
    connection.release();
  } catch (err) {
    console.error('❌ Database Connection Error:', err.message);
    throw err;
  }
};

// Export pool getter
const getPool = () => {
  if (!pool) {
    throw new Error('Database pool not initialized');
  }
  return pool;
};

exports.getPool = getPool;

// =====================================================
// MIDDLEWARE
// =====================================================
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create upload directories if they don't exist
const uploadDirs = [
  'uploads/blogs',
  'uploads/services',
  'uploads/team',
  'uploads/jobs',
  'uploads/resumes'
];

uploadDirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// =====================================================
// LOAD ROUTES
// =====================================================
console.log('\n📦 Loading routes...\n');

// Helper to safely require routes
function safeRequire(modulePath, routeName) {
  try {
    const route = require(modulePath);
    console.log(`✅ Loaded: ${routeName}`);
    return route;
  } catch (err) {
    console.error(`❌ Error loading ${routeName}:`, err.message);
    return null;
  }
}

// Public routes
const blogsRoutes = safeRequire('./routes/blogs', 'Blogs Routes');
const careersRoutes = safeRequire('./routes/careers', 'Careers Routes');
const contactRoutes = safeRequire('./routes/contact', 'Contact Routes');
const authRoutes = safeRequire('./routes/auth', 'Auth Routes');
const teamRoutes = safeRequire('./routes/team', 'Team Routes');
const servicesRoutes = safeRequire('./routes/services', 'Services Routes');

// Admin routes
const adminAuthRoutes = safeRequire('./routes/admin/auth', 'Admin Auth');
const adminBlogsRoutes = safeRequire('./routes/admin/blogs', 'Admin Blogs');
const adminServicesRoutes = safeRequire('./routes/admin/services', 'Admin Services');
const adminJobsRoutes = safeRequire('./routes/admin/jobs', 'Admin Jobs');
const adminTeamRoutes = safeRequire('./routes/admin/team', 'Admin Team');
const adminUsersRoutes = safeRequire('./routes/admin/users', 'Admin Users');
const adminApplicationsRoutes = safeRequire('./routes/admin/applications', 'Admin Applications');
const adminContactsRoutes = safeRequire('./routes/admin/contacts', 'Admin Contacts');
const adminDashboardRoutes = safeRequire('./routes/admin/dashboard', 'Admin Dashboard');

// =====================================================
// MOUNT ROUTES
// =====================================================
console.log('\n🔗 Mounting routes...\n');

function safeUseRoute(path, route, name) {
  try {
    if (!route) {
      console.log(`⚠️  Skipping ${name} - not loaded`);
      return;
    }
    
    if (typeof route !== 'function') {
      console.error(`❌ ${name} is not valid middleware`);
      return;
    }
    
    app.use(path, route);
    console.log(`✅ Mounted: ${name} at ${path}`);
  } catch (err) {
    console.error(`❌ Error mounting ${name}:`, err.message);
  }
}

// Public API routes
safeUseRoute('/api/blogs', blogsRoutes, 'Blogs');
safeUseRoute('/api/careers', careersRoutes, 'Careers');
safeUseRoute('/api/contact', contactRoutes, 'Contact');
safeUseRoute('/api/auth', authRoutes, 'Auth');
safeUseRoute('/api/team', teamRoutes, 'Team');
safeUseRoute('/api/services', servicesRoutes, 'Services');

// Admin API routes
safeUseRoute('/api/admin/auth', adminAuthRoutes, 'Admin Auth');
safeUseRoute('/api/admin/blogs', adminBlogsRoutes, 'Admin Blogs');
safeUseRoute('/api/admin/services', adminServicesRoutes, 'Admin Services');
safeUseRoute('/api/admin/jobs', adminJobsRoutes, 'Admin Jobs');
safeUseRoute('/api/admin/team', adminTeamRoutes, 'Admin Team');
safeUseRoute('/api/admin/users', adminUsersRoutes, 'Admin Users');
safeUseRoute('/api/admin/applications', adminApplicationsRoutes, 'Admin Applications');
safeUseRoute('/api/admin/contacts', adminContactsRoutes, 'Admin Contacts');
safeUseRoute('/api/admin/dashboard', adminDashboardRoutes, 'Admin Dashboard');

// =====================================================
// HEALTH & TEST ENDPOINTS
// =====================================================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: dbConfig.database,
    timestamp: new Date().toISOString(),
    routes: {
      public: {
        blogs: !!blogsRoutes,
        careers: !!careersRoutes,
        contact: !!contactRoutes,
        auth: !!authRoutes,
        team: !!teamRoutes,
        services: !!servicesRoutes
      },
      admin: {
        auth: !!adminAuthRoutes,
        blogs: !!adminBlogsRoutes,
        services: !!adminServicesRoutes,
        jobs: !!adminJobsRoutes,
        team: !!adminTeamRoutes,
        users: !!adminUsersRoutes,
        applications: !!adminApplicationsRoutes,
        contacts: !!adminContactsRoutes,
        dashboard: !!adminDashboardRoutes
      }
    }
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// =====================================================
// ERROR HANDLING
// =====================================================
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

// =====================================================
// START SERVER
// =====================================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(60));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
      console.log('='.repeat(60));
      console.log('\n📌 PUBLIC ENDPOINTS:');
      console.log(`   GET  /api/blogs`);
      console.log(`   GET  /api/careers`);
      console.log(`   GET  /api/services`);
      console.log(`   GET  /api/team`);
      console.log(`   POST /api/contact`);
      console.log(`   POST /api/auth/login`);
      console.log('\n📌 ADMIN ENDPOINTS:');
      console.log(`   POST /api/admin/auth/login`);
      console.log(`   GET  /api/admin/blogs`);
      console.log(`   GET  /api/admin/services`);
      console.log(`   GET  /api/admin/jobs`);
      console.log(`   GET  /api/admin/team`);
      console.log('='.repeat(60) + '\n');
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

module.exports = { getPool };