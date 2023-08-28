import getPSConnection from '../../lib/planetscaledb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { requirement, CoDYear, productionPeriodFrom, productionPeriodTo, type } = req.body;

    try {
      const monthColumns = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];

      const selectedMonths = monthColumns.slice(productionPeriodFrom - 1, productionPeriodTo);
      const sumSelectedMonths = selectedMonths.join(' + ');

      if (!sumSelectedMonths) {
        res.status(400).json({ message: 'Invalid month range' });
        return;
      }

      const connection = await getPSConnection();
      const [rows] = await connection.query(`
  SELECT \`Device ID\`, \`Year\`, \`Type\`, \`CoD\`, \`Committed\`, ${selectedMonths.join(', ')}, (${sumSelectedMonths}) as Total_Production
  FROM tab
  WHERE \`Year\` >= ? AND \`Type\` = ? AND \`CoD\` >= ?
  HAVING Total_Production >= 0
  ORDER BY Total_Production DESC
`, [CoDYear, type, `${CoDYear}-12-31`, requirement]);

      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error querying the database' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
