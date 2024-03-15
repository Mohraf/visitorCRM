// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');

// module.exports = db;

const { Client } = require('pg');

// Configure the connection parameters for your PostgreSQL database
const dbConfig = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'visitors',
  password: 'admin123',
  port: '5432' // Default PostgreSQL port is usually 5432
};

// Create a new PostgreSQL client instance
const db = new Client(dbConfig);

// Connect to the PostgreSQL database
db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(error => {
    console.error('Error connecting to PostgreSQL database:', error);
  });

// Export the PostgreSQL client for use in other modules
module.exports = db;
