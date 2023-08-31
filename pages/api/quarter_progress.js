import getPSConnection from '../../lib/planetscaledb';

export default async function handler(req, res) {
  const conn = await getPSConnection();

  const [rows] = await conn.query(`
    SELECT 
      SUM(January_Commited + February_Commited + March_Commited) as Q1C,
      SUM(April_Commited + May_Commited + June_Commited) as Q2C,
      SUM(July_Commited + August_Commited + September_Commited) as Q3C,
      SUM(October_Commited + November_Commited + December_Commited) as Q4C,
      SUM(January + February + March) as Q1A,
      SUM(April + May + June) as Q2A,
      SUM(July + August + September) as Q3A,
      SUM(October + November + December) as Q4A
    FROM tab
  `);

  res.status(200).json(rows[0]);
}
