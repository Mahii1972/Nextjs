import getPSConnection from '@/lib/planetscaledb';

async function fetchData() {
  const conn = await getPSConnection();
  const [rows] = await conn.query(`
    SELECT
      Month,
      SUM(Actual) as Actual,
      SUM(Estimated) as Estimated
    FROM \`table\`
    GROUP BY Month
  `);
  await conn.end();

  const data = {};
  rows.forEach(row => {
    data[`${row.Month}_Actual`] = row.Actual;
    data[`${row.Month}_Predicted`] = row.Estimated;
  });

  return data;
}

export async function GET(req) {
  const data = await fetchData();
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  });
}