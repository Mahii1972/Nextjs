'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCookie } from '../../cookieUtils';
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
    // If the token is not valid or not present, redirect to the login page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Fetch data after authentication
  const res = await fetch('http://localhost:3000/api/data');
  const data = await res.json();

  // Return both authentication data and fetched data
  return {
    props: {
      token,
      role,
      data,
    },
  };
}

export default function Home({ data }) {
  const getDistinctGroupNames = () => {
    const groupNames = new Set();
    if (data) {
      data.forEach((item) => groupNames.add(item['Group Name']));
    }
    return Array.from(groupNames);
  };

  const [distinctGroupNames, setDistinctGroupNames] = useState([]);

  useEffect(() => {
    setDistinctGroupNames(getDistinctGroupNames());
  }, [data]);

  const getCapacitySum = (groupName) => {
    let sum = 0;
    if (data) {
      data.forEach((item) => {
        if (item['Group Name'] === groupName) {
          sum += item['Capacity (MW)'];
        }
      });
    }
    return sum;
  };

  return (
    <div>
      <h1>Group Names</h1>
      <table>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Total Capacity (MW)</th>
          </tr>
        </thead>
        <tbody>
          {distinctGroupNames.map((groupName) => (
            <tr key={groupName}>
              <td>
                <Link href={`/groupDetails?groupName=${encodeURIComponent(groupName)}`}>
                  {groupName}
                </Link>
              </td>
              <td>{getCapacitySum(groupName)}</td>
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
