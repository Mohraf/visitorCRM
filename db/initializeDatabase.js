const db = require('./index');

const CREATE_USERS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    calendly_uid TEXT UNIQUE NOT NULL,
    access_token TEXT UNIQUE NOT NULL,
    refresh_token TEXT UNIQUE NOT NULL
  )
`;

module.exports = () => {
  return new Promise((resolve, reject) => {
    db.query(CREATE_USERS_TABLE_SQL)
      .then(result => {
        console.log('Users table created successfully');
        resolve(result);
      })
      .catch(error => {
        console.error('Error creating users table:', error);
        reject(error);
      });
  });
};
