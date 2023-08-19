import multer from 'multer';
import XLSX from 'xlsx';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import process from 'process';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({ dest: 'uploads/' });

async function getNewTableName(connection) {
  const [rows] = await connection.query("SHOW TABLES LIKE 'table%'");
  const tableCount = rows.length;
  return `table${tableCount + 1}`;
}



export default async function uploadFile(req, res) {
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

    

    await new Promise((resolve, reject) => {
      upload.single('file')(req, res, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    const workbook = XLSX.readFile(req.file.path);
    const sheetNameList = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

  

    const dbConfig = {
      host: 'aws.connect.psdb.cloud',
      user: 'ngz7zf1fbddebt739x83',
      password: 'pscale_pw_xRQ4QhW5uR27qtEQZ0fg3NOZIEar913f0F33GR14j7u',
      database: 'temporary',
      ssl: {
        ca: process.env.PLANETSCALE_CA_CERT,
      },
    };

    const connection = await mysql.createConnection(dbConfig);

    const newTableName = await getNewTableName(connection);

    await connection.query(
      `CREATE TABLE ${newTableName} (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), phone_number VARCHAR(15), age INT)`
    );

    for (const row of data) {
      await connection.query(`INSERT INTO ${newTableName} SET ?`, row);
    }

    await connection.end();

    res.status(200).json({ message: 'File uploaded and data imported successfully' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
