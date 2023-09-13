import getPSConnection from '@/lib/planetscaledb';

export async function POST(request) {
   const {selectedMonths, organisation} = await request.json();
   console.log('POST message body1:', selectedMonths);
   console.log('POST message body2:', organisation);

   try {
     const connection = await getPSConnection();

     // Loop through the selectedMonths object and update the database
     for (const deviceId in selectedMonths) {
       const deviceMonths = selectedMonths[deviceId];
       for (const month in deviceMonths) {
         const value = deviceMonths[month];
         // Update the database

         await connection.query(`
         INSERT INTO buyers (\`Device ID\`, organisation, ${month})
         VALUES(?, ?, ?)
         ON DUPLICATE KEY UPDATE
         organisation = VALUES(organisation),
         ${month} = VALUES(${month});
         `, [deviceId, organisation, value]);
       }
     }

     return new Response(JSON.stringify({ success: true, message: 'Buyer Database updated successfully!' }), { status: 200, headers: { 'Content-Type': 'application/json' }});
   } catch (error) {
     console.error("Error:", error);
     return new Response(JSON.stringify({ message: 'Error updating the buyer database' }), { status: 500, headers: { 'Content-Type': 'application/json' }});
   }
}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(req) {
    const headers = new Headers();
    headers.set('Allow', ['POST']);
    return new Response}