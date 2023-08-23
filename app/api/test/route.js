// api/test.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const data = await prisma.$queryRawUnsafe(`
    SELECT
    SUM(COALESCE(\`January (kWh)\`, 0)) as January,
    SUM(COALESCE(\`February (kWh)\`, 0)) as February,
    SUM(COALESCE(\`March (kWh)\`, 0)) as March,
    SUM(COALESCE(\`April (kWh)\`, 0)) as April,
    SUM(COALESCE(\`May (kWh)\`, 0)) as May,
    SUM(COALESCE(\`June (kWh)\`, 0)) as June,
    SUM(COALESCE(\`July (kWh)\`, 0)) as July,
    SUM(COALESCE(\`August (kWh)\`, 0)) as August,
    SUM(COALESCE(\`September (kWh)\`, 0)) as September,
    SUM(COALESCE(\`October (kWh)\`, 0)) as October,
    SUM(COALESCE(\`November (kWh)\`, 0)) as November,
    SUM(COALESCE(\`December (kWh)\`, 0)) as December
  FROM Gen2022
    `);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
}