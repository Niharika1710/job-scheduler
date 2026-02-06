const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Niharika@1710",
  database: "job_scheduler"
});

module.exports = pool.promise();
