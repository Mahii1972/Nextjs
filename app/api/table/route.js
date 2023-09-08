import getPSConnection from '@/lib/planetscaledb';

export async function POST(request) {
  const { requirement, CoDYear, productionPeriodFrom, productionPeriodTo, type } = await request.json();

  const monthColumns = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const selectedMonths = monthColumns.slice(productionPeriodFrom - 1, productionPeriodTo);
  const sumSelectedMonths = selectedMonths.join(' + ');

  if (!sumSelectedMonths) {
    return new Response(JSON.stringify({ message: 'Invalid month range' }), { status: 400 });
  }

  try {
    const connection = await getPSConnection();
    const [rows] = await connection.query(`
      SELECT \`Device ID\`, \`Year\`, \`Type\`, \`CoD\`, \`Committed\`, ${selectedMonths.join(', ')}, (${sumSelectedMonths}) as Total_Production
      FROM tab
      WHERE \`Year\` >= ? AND \`Type\` = ? AND \`CoD\` >= ?
      HAVING Total_Production >= 0
      ORDER BY Total_Production DESC
    `, [CoDYear, type, `${CoDYear}-12-31`]);
    
    return new Response(JSON.stringify(rows), {
      headers: { 'content-type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error querying the database' }), {
      headers: { 'content-type': 'application/json' },
      status: 500
    });
  }
}