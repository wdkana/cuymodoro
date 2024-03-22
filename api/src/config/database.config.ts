import mysql, { Pool } from "mysql";
import dotenv from "dotenv";
dotenv.config();

export const connection: Pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
