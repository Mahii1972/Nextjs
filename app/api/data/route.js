import getPSConnection from '../../../lib/planetscaledb';

export default async function handler(req, res) {
  try {
    const connection = await getPSConnection();
    const [rows] = await connection.query('SELECT * FROM Inventory');
    if (res) {
      res.status(200).json(rows);
    } else {
      console.error('Response object is undefined');
    }
  } catch (error) {
    console.error('Error in handler:', error);
    if (res) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}