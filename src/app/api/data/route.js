import { NextResponse } from 'next/server';
import getPSConnection from '@/lib/planetscaledb';

export async function GET(request) {
  const connection = await getPSConnection();
  const [rows] = await connection.query('SELECT * FROM Inventory');
  return NextResponse.json(rows, { status: 200 });
}
