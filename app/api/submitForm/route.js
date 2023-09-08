import getPSConnection from '@/lib/planetscaledb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.json();
    console.log('Received data:', data);
  // Ensure all fields are defined
  const fields = ['groupName', 'companyName', 'projectName', 'capacityMW', 'deviceId', 'deviceType', 'registered', 'cod'];
  fields.forEach(field => {
    if (!data[field]) data[field] = null;
  });

  try {
    const conn = await getPSConnection();
    const [result] = await conn.execute(
      'INSERT INTO inv (`Group Name`, `Company Name`, `Project Name`, `Capacity (MW)`, `Device ID`, `Device Type`, Registered, CoD) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [data.groupName, data.companyName, data.projectName, data.capacityMW, data.deviceId, data.deviceType, data.registered, data.cod]
    );
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error inserting data" }, { status: 500 });
  }
}