import multer from 'multer';
import XLSX from 'xlsx';
import jwt from 'jsonwebtoken';
import process from 'process';
import getPSConnection from '../../lib/planetscaledb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({ dest: 'uploads/' });

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

    const connection = await getPSConnection();

    for (const row of data) {
      // Convert date from 'DD.MM.YYYY' format to 'YYYY-MM-DD'
      let dateParts = row['CoD'].split(".");
      let mysqlFormattedDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString().slice(0, 10);
  
      // First, check if the row with the same Device ID already exists
      const [rows, fields] = await connection.query('SELECT * FROM inv WHERE `Device ID` = ?', [row['Device ID']]);
  
      if (rows.length > 0) {
          // A row with the same Device ID already exists, so update it
          await connection.query(`
              UPDATE inv SET
                  \`Group Name\` = ?,
                  \`Company Name\` = ?,
                  \`Project Name\` = ?,
                  \`Capacity (MW)\` = ?,
                  \`Device Type\` = ?,
                  \`Registered\` = ?,
                  \`CoD\` = ?
              WHERE \`Device ID\` = ?
              `, [row['Group Name'], row['Company Name'], row['Project Name'], row['Capacity (MW)'], row['Device Type'], row['Registered'], mysqlFormattedDate, row['Device ID']]);
      } else {
          // No row with the same Device ID exists, so insert a new one
          await connection.query(`
              INSERT INTO inv (
                  \`Group Name\`, 
                  \`Company Name\`,
                  \`Project Name\`,
                  \`Capacity (MW)\`,
                  \`Device ID\`,
                  \`Device Type\`,
                  \`Registered\`,
                  \`CoD\`
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
              `, [row['Group Name'], row['Company Name'], row['Project Name'], row['Capacity (MW)'], row['Device ID'], row['Device Type'], row['Registered'], mysqlFormattedDate]);
      }
  }

    await connection.end();

    res.status(200).json({ message: 'File uploaded and data imported successfully' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}