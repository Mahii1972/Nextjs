import React, { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer, PolarAngleAxis } from 'recharts';

function calculatePercentage(data) {
  const totalActual = data.Total_Actual;
  const totalCommitted = data.Total_Committed;
  const committedPercentage = (totalCommitted / totalActual) * 100;
  const actualPercentage = (100-committedPercentage/100);

  return [
    { name: 'Predicted', uv: actualPercentage, fill: '#3f51b5' },
    { name: 'Committed', uv: committedPercentage, fill: '#FFD700' },
  ];
}

export default function CircularProgressBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/progressapi');
      const json = await response.json();
      setData(calculatePercentage(json));
    }

    fetchData();
  }, []);

  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {data.map((entry, index) => (
        <ResponsiveContainer key={index} width="50%" height={300}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            barSize={10}
            data={[entry]}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              minAngle={15}
              label={{ position: 'center', fill: 'black' }}
              background
              clockWise
              dataKey="uv"
              fill={entry.fill}
              strokeWidth={10}
              stroke="none"
            />
            <Tooltip />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
          </RadialBarChart>
        </ResponsiveContainer>
      ))}
    </div>
  );
}
