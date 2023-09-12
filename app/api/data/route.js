import getPSConnection from '@/lib/planetscaledb';

export async function GET() {
    const connection = await getPSConnection();
    const [rows] = await connection.query('SELECT * FROM Inventory');

    return new Response(JSON.stringify(rows), {
        headers: { 'content-type': 'application/json' },
        status: 200
    });
}