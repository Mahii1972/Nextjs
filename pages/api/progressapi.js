import getPSConnection from '../../lib/planetscaledb';

async function fetchData() {
  const conn = await getPSConnection();
  const [rows] = await conn.query(`
    SELECT
      SUM(Committed) as Total_Committed,
      SUM(January + February + March + April + May + June + July + August + September + October + November + December) as Total_Actual
    FROM tab
  `);
  await conn.end();
  return rows[0];
}

export default async function handler(req, res) {
  const data = await fetchData();
  res.status(200).json(data);
}