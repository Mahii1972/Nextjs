// pages/api/data.js
import getPSConnection from '../../lib/planetscaledb';

export default async function handler(req, res) {
  const connection = await getPSConnection();
  const [rows] = await connection.query('SELECT * FROM Inventory');
  res.status(200).json(rows);
}
