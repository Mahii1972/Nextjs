import React, { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

export default function RadialBarChartPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3000/api/mon2022data');
      const data = await res.json();
      setData(data);
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = [
    { name: 'Balance Credits', value: data.BalanceCreditsMWh || 0, fill: '#ffc658' },
    { name: 'Credits Sold', value: data.CreditsSoldMWh || 0, fill: '#82ca9d' },
    { name: 'Credits Generated', value: data.CreditsGeneratedMWh || 0, fill: '#8884d8' },
    
    
  ];

  return (
    <div>
      <h1>Units Monitoring 2022</h1>
      <RadialBarChart
        width={500}
        height={300}
        cx={150}
        cy={150}
        innerRadius={20}
        outerRadius={140}
        barSize={10}
        data={chartData}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar minAngle={15} label background clockWise dataKey="value" />
        <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={{ top: 0, right: 0 }} />
        <Tooltip />
      </RadialBarChart>
    </div>
  );
}