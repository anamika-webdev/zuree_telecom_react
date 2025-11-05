// scripts/seed-admin.js
// Run this to create/update the admin user with proper password hash

const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedAdmin() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'zuree_telecom_react'
    });

    console.log('✅ Connected to database');

    // Hash the password
    const password = 'Admin@123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('🔐 Password hashed successfully');

    // Insert or update admin user
    const [result] = await connection.query(
      `INSERT INTO admin_users (username, email, password, full_name, role, status) 
       VALUES (?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE 
       password = VALUES(password),
       status = VALUES(status)`,
      ['admin', 'admin@zureetelecom.com', hashedPassword, 'System Administrator', 'super_admin', 'active']
    );

    console.log('✅ Admin user created/updated successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('   Username: admin');
    console.log('   Email: admin@zureetelecom.com');
    console.log('   Password: Admin@123');
    console.log('   Role: super_admin\n');

  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Connection closed');
    }
  }
}

seedAdmin();