const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'mysql0909',
  database: 'coinstagram',
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});
module.exports = pool;
