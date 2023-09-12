"use client"
import React, { useState, useEffect ,useContext } from 'react';
import ResultsContext from '@/app/SearchContext/store';

export default function GroupDetails() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { groupName } = useContext(ResultsContext);


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/data');
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  const filteredData = data
    ? data.filter((item) => item['Group Name'] === groupName)
    : [];

  
  return (
    <div>
      <h2>Details for Group: {groupName}</h2>
      <input
        type="text"
        placeholder="Search company names"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Project Name</th>
            <th>Capacity (MW)</th>
            <th>Device ID</th>
            <th>Device Type</th>
            <th>Registered</th>
            <th>CoD</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .filter((item) =>
              item['Company Name'].toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item) => (
              <tr key={item.id}>
                <td>{item['Company Name']}</td>
                <td>{item['Project Name']}</td>
                <td>{item['Capacity (MW)']}</td>
                <td>{item['Device ID']}</td>
                <td>{item['Device Type']}</td>
                <td>{item['Registered']}</td>
                <td>{new Date(item['CoD']).toDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        thead {
          background-color: #f2f2f2;
        }
        th,
        td {
          padding: 8px;
          text-align: left;
          border: 1px solid #ddd;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
}


