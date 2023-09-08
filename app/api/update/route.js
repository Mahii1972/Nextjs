import getPSConnection from '@/lib/planetscaledb';

export async function POST(request) {
  const selectedMonths = await request.json();
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
          SET
            \`${month}\` = GREATEST(\`${month}\` - ?, 0),
            \`Committed\` = \`Committed\` + ?,
            \`${month}_Commited\` = \`${month}_Commited\` + ?
          WHERE \`Device ID\` = ?
        `, [value, value, value, deviceId]);
      }
    }

    return new Response(JSON.stringify({ success: true, message: 'Database updated successfully' }), {
      headers: { 'content-type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: 'Error updating the database' }), {
      headers: { 'content-type': 'application/json' },
      status: 500
    });
  }
}