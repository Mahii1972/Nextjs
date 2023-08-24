import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const SimpleChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/test');
      const fetchedData = await res.json();
      console.log('Fetched data:', fetchedData); // Log the fetched data
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <LineChart width={600} height={300} data={data}>
      {/* Add your chart configuration here */}
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default SimpleChart;