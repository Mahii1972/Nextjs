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
    // If the token is not valid or not present, redirect to the login page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Fetch data after authentication
  const res = await fetch(`http://localhost:3000/api/data`);
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
  const [expandedGroup, setExpandedGroup] = useState(null);

  const handleButtonClick = (groupName) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  const getCapacitySum = (groupName) => {
    let sum = 0;
    data.forEach((item) => {
      if (item['Group Name'] === groupName) {
        sum += item['Capacity (MW)'];
      }
    });
    return sum;
  };

  return (
    <div>
      <h1>Group name</h1>
      <div>
        {['NTPC Ltd.', 'Power Grid Corporation Of India Ltd.', 'Tata Power', 'NHPC Ltd.', 'Adani Transmission Ltd.'].map(
          (groupName) => (
            <button key={groupName} onClick={() => handleButtonClick(groupName)}>
              {groupName}
            </button>
          )
        )}
      </div>
      {expandedGroup && (
        <div>
          <h2>Company Names for Group: {expandedGroup}</h2>
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                if (item['Group Name'] === expandedGroup) {
                  return (
                    <tr key={item.id}>
  <td>
    <details>
      <summary>{item['Company Name']}</summary>
      <p>Project Name: {item['Project Name']}</p>
      <p>Capacity (MW): {item['Capacity (MW)']}</p>
      <p>Device ID: {item['Device ID']}</p>
      <p>Device Type: {item['Device Type']}</p>
      <p>Registered: {item['Registered']}</p>
      <p>CoD: {new Date(item['CoD']).toDateString()}</p>
    </details>
  </td>
</tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
          <h2>Sum of Capacity (MW) for Group: {expandedGroup}</h2>
          <p>{getCapacitySum(expandedGroup)}</p>
        </div>
      )}
      <style jsx>{`
        button {
          margin: 5px;
          padding: 10px;
          background-color: #f2f2f2;
          border: none;
          cursor: pointer;
        }
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
          border-bottom: 1px solid #ddd;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
        details {
          cursor: pointer;
        }
        details p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}