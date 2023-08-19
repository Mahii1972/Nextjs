import { MongoClient } from 'mongodb';
import multer from 'multer';
import xlsx from 'xlsx';
import jwt from 'jsonwebtoken';
import process from 'process';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const upload = multer({ dest: '/tmp' });

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getNewCollectionName(db) {
  const collections = await db.listCollections().toArray();
  const collectionCount = collections.filter((collection) => collection.name.startsWith('collection')).length;
  return `collection${collectionCount + 1}`;
}


const handler = async (req, res) => {
  if (req.method === 'POST') {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const uploadMiddleware = upload.single('file');
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });

    if (!req.file) {
      res.status(400).send('No file uploaded');
      return;
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetNames = workbook.SheetNames;
    const sheetIndex = 0;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[sheetIndex]]);

    const client = new MongoClient('mongodb+srv://mahi1972:dQYnmNu4MqeMxrkK@cluster0.ovoj4gv.mongodb.net/?retryWrites=true&w=majority');
    await client.connect();

    const db = client.db('Cluster0');
    const newCollectionName = await getNewCollectionName(db);
    const collection = db.collection(newCollectionName);

    try {
      await collection.insertMany(data);
      res.status(200).json({ status: 'uploaded' });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    } finally {
      await client.close();
    }
  } else {
    res.status(400).send('Wrong method');
  }
};

export default handler;
