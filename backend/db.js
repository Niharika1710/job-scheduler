const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
  ssl: {
    rejectUnauthorized: false, // REQUIRED for Railway public proxy
  },
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;