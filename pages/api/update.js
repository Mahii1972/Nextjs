import getPSConnection from '../../lib/planetscaledb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const selectedMonths = req.body.selectedMonths;
    console.log('POST message body:', selectedMonths);
      
    try {
      const connection = await getPSConnection();
      

      // Loop through the selectedMonths object and update the database
      for (const deviceId in selectedMonths) {
        const deviceMonths = selectedMonths[deviceId];
        for (const month in deviceMonths) {
          const value = deviceMonths[month];
          // Update the database
          await connection.query(`
  UPDATE tab
  SET \`${month}\` = GREATEST(\`${month}\` - ?, 0), \`Committed\` = \`Committed\` + ?
  WHERE \`Device ID\` = ?
`, [value, value, deviceId]);


        }
      }

      res.status(200).json({ success: true, message: 'Database updated successfully' });

    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: 'Error updating the database' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
