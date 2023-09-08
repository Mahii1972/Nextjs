import getPSConnection from '@/lib/planetscaledb';

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

export async function GET(req) {
  const data = await fetchData();
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  });
}