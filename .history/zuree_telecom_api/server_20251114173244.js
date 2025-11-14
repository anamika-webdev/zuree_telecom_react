// server.js - Debug Version to Find the Problem Route
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const teamRoutes = require('./routes/team');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/team', teamRoutes); 

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
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database:', dbConfig.database);
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

// Export getPool first
module.exports = { getPool };

// Helper function to safely require a route
function safeRequire(routePath, routeName) {
  try {
    const fullPath = path.join(__dirname, routePath);
    if (fs.existsSync(fullPath + '.js')) {
      const route = require(routePath);
      console.log(`✅ Loaded route: ${routeName}`);
      return route;
    } else {
      console.log(`⚠️  Route not found: ${routeName} (${routePath})`);
      return null;
    }
  } catch (err) {
    console.error(`❌ Error loading route ${routeName}:`, err.message);
    return null;
  }
}

// Load routes safely
const blogsRoutes = safeRequire('./routes/blogs', 'Blogs');
const careersRoutes = safeRequire('./routes/careers', 'Careers');
const contactRoutes = safeRequire('./routes/contact', 'Contact');
const authRoutes = safeRequire('./routes/auth', 'Auth');
const adminAuthRoutes = safeRequire('./routes/admin/auth', 'Admin Auth');
const adminBlogsRoutes = safeRequire('./routes/admin/blogs', 'Admin Blogs');
const adminUsersRoutes = safeRequire('./routes/admin/users', 'Admin Users');

console.log('\n📦 Route Loading Summary:');

// Helper to safely use routes with detailed error info
function safeUseRoute(path, route, name) {
  try {
    console.log(`Attempting to mount: ${name} at ${path}`);
    
    // Check if route is valid
    if (!route) {
      console.log(`⚠️  Skipping ${name} - route is null/undefined`);
      return;
    }
    
    // Check if route is a function (middleware)
    if (typeof route !== 'function') {
      console.error(`❌ ${name} is not a function! Type: ${typeof route}`);
      console.error(`Route object keys:`, Object.keys(route));
      return;
    }
    
    app.use(path, route);
    console.log(`✅ Successfully mounted: ${name} at ${path}\n`);
  } catch (err) {
    console.error(`❌ Error mounting ${name}:`, err.message);
    console.error(`Full error:`, err);
  }
}

// Public API Routes
safeUseRoute('/api/blogs', blogsRoutes, 'Blogs');
safeUseRoute('/api/careers', careersRoutes, 'Careers');
safeUseRoute('/api/contact', contactRoutes, 'Contact');
safeUseRoute('/api/auth', authRoutes, 'Auth');

// Admin API Routes
safeUseRoute('/api/admin/auth', adminAuthRoutes, 'Admin Auth');
safeUseRoute('/api/admin/blogs', adminBlogsRoutes, 'Admin Blogs');
safeUseRoute('/api/admin/users', adminUsersRoutes, 'Admin Users');
safeUseRoute('/api/team', teamRoutes, 'Team');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: dbConfig.database,
    routes: {
      public: {
        blogs: !!blogsRoutes,
        careers: !!careersRoutes,
        contact: !!contactRoutes,
        auth: !!authRoutes
      },
      admin: {
        auth: !!adminAuthRoutes,
        blogs: !!adminBlogsRoutes,
        users: !!adminUsersRoutes
      }
    }
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
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
      console.log('\n' + '='.repeat(50));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
      console.log(`📍 Test endpoint: http://localhost:${PORT}/api/test`);
      if (adminAuthRoutes) {
        console.log(`🔐 Admin login: POST http://localhost:${PORT}/api/admin/auth/login`);
      }
      console.log('='.repeat(50) + '\n');
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();