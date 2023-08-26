import getPSConnection from '../../lib/planetscaledb';


export default async (req, res) => {
  const data = req.body;
  console.log(req.body);

  try {
    const conn = await getPSConnection();
    const [result] = await conn.execute(
      'INSERT INTO inv (`Group Name`, `Company Name`, `Project Name`, `Capacity (MW)`, `Device ID`, `Device Type`, Registered, CoD) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [data.groupName, data.companyName, data.projectName, data.capacityMW, data.deviceId, data.deviceType, data.registered, data.cod]
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error); // Add this line to log the error
    return res.status(500).json({ error: "Error inserting data" });
  }
};

