
import getPSConnection from '@/lib/planetscaledb';

export async function POST() {

  try {

    // Establish a new database connection
    const db = await getPSConnection();

    // Start the transaction
    await db.beginTransaction();

    // Update existing rows in `summary`
    const SQL_UPDATE = `
      UPDATE summary 
      INNER JOIN (
        SELECT 
          Month, 
          SUM(Actual) as Actual, 
          SUM(Actual_used) as Actual_used, 
          SUM(Estimated) as Estimated, 
          SUM(Estimated_used) as Estimated_used, 
          SUM(Issued) as issued 
        FROM \`table\` 
        GROUP BY Month
      ) AS temp ON summary.month = temp.Month 
      SET 
        summary.Actual = summary.Actual + temp.Actual, 
        summary.Actual_used = summary.Actual_used + temp.Actual_used, 
        summary.Estimated = summary.Estimated + temp.Estimated, 
        summary.Estimated_used = summary.Estimated_used + temp.Estimated_used, 
        summary.issued = summary.issued + temp.issued;
    `;

    // Insert new rows into `summary` for months that are not already there
    const SQL_INSERT = `
      INSERT INTO summary (month, Actual, Actual_used, Estimated, Estimated_used, issued)
      SELECT 
        Month, 
        SUM(Actual), 
        SUM(Actual_used), 
        SUM(Estimated), 
        SUM(Estimated_used), 
        SUM(Issued)
      FROM \`table\`
      WHERE Month NOT IN (SELECT month FROM summary)
      GROUP BY Month;
    `;

    // Execute the SQL queries
    await db.query(SQL_UPDATE);
    await db.query(SQL_INSERT);

    // Commit changes
    await db.commit();

    return new Response('Sync completed successfully.', {
      status: 200
    });

  } catch (error) { 
    console.error(error);

    // Rollback changes
    await db.rollback();

    return new Response(error.message, { 
      status: 500 
    })
  }
}