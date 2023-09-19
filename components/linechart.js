// components/LineChart.js
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// components/LineChart.js
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
function transformData(data) {
  return months.map((month) => ({
    month,
    Predicted: data[`${month}_Predicted`],
    Actual: data[`${month}_Actual`],
  }));
}

export default function KwhLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/lineapi');
      const json = await response.json();
      setData(transformData(json));
    }

    fetchData();
  }, []);

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis domain={[0, 1918369]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Predicted" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Actual" stroke="#82ca9d" />
    </LineChart>
  );
}