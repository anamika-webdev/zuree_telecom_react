// Quick script to check database schema
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'zuree_telecom_react'
};

async function checkSchema() {
    const connection = await mysql.createConnection(dbConfig);

    console.log('\n=== CHECKING DATABASE SCHEMA ===\n');

    // Check job_applications table
    const [appColumns] = await connection.query('DESCRIBE job_applications');
    console.log('job_applications columns:');
    appColumns.forEach(col => console.log(`  - ${col.Field} (${col.Type})`));

    // Check contact_messages table
    const [contactColumns] = await connection.query('DESCRIBE contact_messages');
    console.log('\ncontact_messages columns:');
    contactColumns.forEach(col => console.log(`  - ${col.Field} (${col.Type})`));

    // Check blogs table
    const [blogColumns] = await connection.query('DESCRIBE blogs');
    console.log('\nblogs columns:');
    blogColumns.forEach(col => console.log(`  - ${col.Field} (${col.Type})`));

    // Check jobs table
    const [jobColumns] = await connection.query('DESCRIBE jobs');
    console.log('\njobs columns:');
    jobColumns.forEach(col => console.log(`  - ${col.Field} (${col.Type})`));

    await connection.end();
}

checkSchema().catch(console.error);
