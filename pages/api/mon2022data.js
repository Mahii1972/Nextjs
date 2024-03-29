import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const data = await prisma.$queryRawUnsafe(`
    SELECT
    COALESCE(SUM(\`Credits Generated (MWh)\`), 0) * 100 / COALESCE(SUM(\`Credits Generated (MWh)\`), 1) as CreditsGeneratedMWhPercentage,
    COALESCE(SUM(\`Credits Sold (MWh)\`), 0) * 100 / COALESCE(SUM(\`Credits Generated (MWh)\`), 1) as CreditsSoldMWhPercentage,
    COALESCE(SUM(\`Balance Credits (MWh)\`), 0) * 100 / COALESCE(SUM(\`Credits Generated (MWh)\`), 1) as BalanceCreditsMWhPercentage
FROM Mon2022;
    `);
    res.status(200).json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
}