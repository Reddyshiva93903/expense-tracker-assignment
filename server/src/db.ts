import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  // FORCE an empty string if process.env.DB_PASSWORD is undefined
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "expense_tracker",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((connection) => {
    console.log("✅ MySQL Database connected successfully!");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ MySQL Connection failed:", err);
  });
export default pool;
