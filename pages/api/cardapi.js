// api/cardapi.js
import getPSConnection from '../../lib/planetscaledb';

export default async function handler(req, res) {
  const connection = await getPSConnection();
  const [rows] = await connection.query(`
    SELECT
      SUM(January_Commited + February_Commited + March_Commited + April_Commited + May_Commited + June_Commited + July_Commited + August_Commited + September_Commited + October_Commited + November_Commited + December_Commited) AS total_committed,
      SUM(January_Issued + February_Issued + March_Issued + April_Issued + May_Issued + June_Issued + July_Issued + August_Issued + September_Issued + October_Issued + November_Issued + December_Issued) AS total_issued,
      SUM(January + February + March + April + May + June + July + August + September + October + November + December) AS total,
      COUNT(*) AS total_devices,
      COUNT(CASE WHEN Committed > 0 THEN 1 END) AS committed_devices
    FROM tab
  `);
  const committed_percentage = (rows[0].total_committed / rows[0].total) * 100;
  const issued_percentage = (rows[0].total_issued / rows[0].total) * 100;
  res.status(200).json({
    committed_percentage,
    issued_percentage,
    total_devices: rows[0].total_devices,
    committed_devices: rows[0].committed_devices,
  });
}