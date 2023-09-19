import getPSConnection from '@/lib/planetscaledb';

async function fetchQueryData() {
  const conn = await getPSConnection();
  const [rows] = await conn.query(`
    SELECT
      QUARTER(CoD) as Quarter,
      SUM(IF(Actual = 0 AND Actual_used = 0, Estimated, Actual)) as Actual,
      SUM(IF(Actual = 0 AND Actual_used = 0, Estimated_used, Actual_used)) as Actual_used
    FROM \`table\`
    GROUP BY QUARTER(CoD)
  `);
  await conn.end();

  const data = {};
  rows.forEach(row => {
    data[`Q${row.Quarter}A`] = row.Actual;
    data[`Q${row.Quarter}C`] = row.Actual_used;
  });

  return data;
}

export async function GET(req) {
  const data = await fetchQueryData();

  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  });
}