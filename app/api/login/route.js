import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import { setCookie } from '../../cookieUtils';
import dotenv from 'dotenv';



dotenv.config();

const dbUrl = new URL(process.env.DATABASE_URL);

const dbConfig = {
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1),
  ssl: {
    ca: process.env.PLANETSCALE_CA_CERT,
  },
};
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      'SELECT * FROM pass WHERE username = ?',
      [username]
    );

    if (rows.length > 0 && bcrypt.compareSync(password, rows[0].password)) {
      const token = jwt.sign({ username, role: rows[0].role }, JWT_SECRET, {
        expiresIn: '120s',
      });
      
      const expiresAt = Math.floor(Date.now() / 1000) + 120; // Current time + 20 seconds
      setCookie(res, 'auth', token, { httpOnly: true, path: '/' });
      res.status(200).json({ token, expiresAt });
    } else {
      res.status(401).json({ message: 'Invalid login' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
