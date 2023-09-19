// api/cardapi.js
import getPSConnection from '@/lib/planetscaledb';

export async function GET(req) {
  const connection = await getPSConnection();
  const [rows] = await connection.query(`
    SELECT
      SUM(Estimated_used) AS total_committed,
      SUM(Issued) AS total_issued,
      COUNT(DISTINCT \`Device ID\`) AS total_devices,
      COUNT(DISTINCT CASE WHEN Estimated_used > 0 OR Actual_used > 0 THEN \`Device ID\` END) AS committed_devices,
      SUM(Estimated) AS sum_estimated_used,
      SUM(Actual) AS sum_issued
    FROM \`table\`
  `);
  const committed_percentage = (rows[0].total_committed / rows[0].sum_estimated_used) * 100;
  const issued_percentage = (rows[0].total_issued / rows[0].sum_issued) * 100;
  return new Response(
    JSON.stringify({
      committed_percentage,
      issued_percentage,
      total_devices: rows[0].total_devices,
      committed_devices: rows[0].committed_devices,
    }), 
    { 
      status: 200, 
      headers: { 
        'Content-Type': 'application/json' 
      } 
    }
  );
}