import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const data = await prisma.$queryRawUnsafe(`
      SELECT * FROM Inventory
      LIMIT ? OFFSET ?
    `, limit, skip);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
}
