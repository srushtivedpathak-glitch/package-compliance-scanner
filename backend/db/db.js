import mysql from "mysql2/promise";
import "dotenv/config";

const db = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD_MYSQL,
    database: "compliance_scanner"
});

console.log("MySQL connected successfully");

export default db;