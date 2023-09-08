import getPSConnection from '@/lib/planetscaledb';

async function fetchData() {
  const conn = await getPSConnection();
  const [rows] = await conn.query(`
    SELECT
      SUM(January_Actual) as January_Actual, SUM(January_Issued) as January_Issued,
      SUM(February_Actual) as February_Actual, SUM(February_Issued) as February_Issued,
      SUM(March_Actual) as March_Actual, SUM(March_Issued) as March_Issued,
      SUM(April_Actual) as April_Actual, SUM(April_Issued) as April_Issued,
      SUM(May_Actual) as May_Actual, SUM(May_Issued) as May_Issued,
      SUM(June_Actual) as June_Actual, SUM(June_Issued) as June_Issued,
      SUM(July_Actual) as July_Actual, SUM(July_Issued) as July_Issued,
      SUM(August_Actual) as August_Actual, SUM(August_Issued) as August_Issued,
      SUM(September_Actual) as September_Actual, SUM(September_Issued) as September_Issued,
      SUM(October_Actual) as October_Actual, SUM(October_Issued) as October_Issued,
      SUM(November_Actual) as November_Actual, SUM(November_Issued) as November_Issued,
      SUM(December_Actual) as December_Actual, SUM(December_Issued) as December_Issued
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