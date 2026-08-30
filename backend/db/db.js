import mysql from "mysql2/promise";
import "dotenv/config";

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "compliance_scanner",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Quick sanity check on startup — doesn't hold the connection open,
// just confirms credentials/host work before your server starts
// accepting requests.
try {
    const conn = await db.getConnection();
    console.log("MySQL pool connected successfully");
    conn.release();
} catch (err) {
    console.error("MySQL connection failed:", err.message);
}

export default db;