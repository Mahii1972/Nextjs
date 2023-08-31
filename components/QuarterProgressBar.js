import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const QuartersDropdown = ({ items, onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      defaultValue={items[0]}
    >
      {items.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

const QuarterProgress = () => {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const [selectedQuarter, setSelectedQuarter] = useState(quarters[0]);
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/quarter_progress');
      const json = await res.json();
      setData(json);
    }

    fetchData();
  }, []);

  const handleQuarterChange = (quarter) => {
    setSelectedQuarter(quarter);
  };

  const total = (Number(data[`${selectedQuarter}C`]) || 0) + (Number(data[`${selectedQuarter}A`]) || 0);
  const committed = total !== 0 ? ((Number(data[`${selectedQuarter}C`]) || 0) / total) * 100 : 0;
  const predicted = total !== 0 ? ((Number(data[`${selectedQuarter}A`]) || 0) /total) * 100: 0;

  const barData = [
    {
      type: 'Committed',
      value: committed,
    },
    {
      type: 'predicted',
      value: predicted,
    },
  ];

  return (
    <div>
      <QuartersDropdown items={quarters} onChange={handleQuarterChange} />
      <ResponsiveContainer width="100%" height={100}>
        <BarChart layout="vertical" data={barData}>
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" dataKey="type" />
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
          <Bar dataKey={(data) => data.type === 'Committed' ? data.value : null } fill="#8884d8" />
          <Bar dataKey={(data) => data.type === 'predicted' ? data.value : null } fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuarterProgress;