import getPSConnection from '@/lib/planetscaledb';

async function fetchData() {
  const conn = await getPSConnection();
  const [rows] = await conn.query(`
  SELECT
  SUM(Estimated_used) as Total_Committed,
  SUM(Estimated) as Total_Actual
FROM \`table\`
  `);
  await conn.end(); 
  return rows[0];
}

export async function GET(req) {
  const data = await fetchData();
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  });
}