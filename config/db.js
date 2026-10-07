const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "NewPassword123!",
  database: "portfolioDemo",
});

module.exports = pool;
