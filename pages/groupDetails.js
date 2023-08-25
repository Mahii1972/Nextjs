import React, { useState } from 'react';
import { getCookie } from '../cookieUtils';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function getServerSideProps(context) {
  const token = getCookie(context.req, 'auth');
  let decoded;
  let role = 'guest';

  try {
    decoded = jwt.verify(token, JWT_SECRET);
    role = decoded.role;
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { groupName } = context.query;
  const res = await fetch('http://localhost:3000/api/data');
  const data = await res.json();
  return { props: { groupName, data } };
}

export default function GroupDetails({ groupName, data }) {
  const [searchQuery, setSearchQuery] = useState('');

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
          {data
            .filter((item) => item['Group Name'] === groupName)
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
