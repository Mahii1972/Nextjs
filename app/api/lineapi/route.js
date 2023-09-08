import getPSConnection from '@/lib/planetscaledb';

async function fetchData() {
  const conn = await getPSConnection();
  const [rows] = await conn.query(`
    SELECT
      SUM(January) as January_Predicted, SUM(January_Actual) as January_Actual,
      SUM(February) as February_Predicted, SUM(February_Actual) as February_Actual,
      SUM(March) as March_Predicted, SUM(March_Actual) as March_Actual,
      SUM(April) as April_Predicted, SUM(April_Actual) as April_Actual,
      SUM(May) as May_Predicted, SUM(May_Actual) as May_Actual,
      SUM(June) as June_Predicted, SUM(June_Actual) as June_Actual,
      SUM(July) as July_Predicted, SUM(July_Actual) as July_Actual,
      SUM(August) as August_Predicted, SUM(August_Actual) as August_Actual,
      SUM(September) as September_Predicted, SUM(September_Actual) as September_Actual,
      SUM(October) as October_Predicted, SUM(October_Actual) as October_Actual,
      SUM(November) as November_Predicted, SUM(November_Actual) as November_Actual,
      SUM(December) as December_Predicted, SUM(December_Actual) as December_Actual
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