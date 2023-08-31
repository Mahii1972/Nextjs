import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function transformData(data) {
  return months.map((month) => ({
    month,
    Issued: data[`${month}_Issued`],
    Actual: data[`${month}_Actual`],
  }));
}

export default function TwoBarsPerMonth() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/barapi');
      const json = await response.json();
      setData(transformData(json));
    }

    fetchData();
  }, []);

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Actual" fill="#8884d8" />
      <Bar dataKey="Issued" fill="#82ca9d" />
    </BarChart>
  );
}