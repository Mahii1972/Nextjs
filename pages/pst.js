import React, { useState } from 'react';

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/data`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const [expandedGroup, setExpandedGroup] = useState(null);

  const handleButtonClick = (groupName) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  return (
    <div>
      <h1>Group name</h1>
      <style jsx>{`
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th,
        td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      `}</style>
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
        <table>
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Company Name</th>
              <th>Project Name</th>
              <th>Capacity (MW)</th>
              <th>Device ID</th>
              <th>CoD</th>
              <th>Device Type</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((item) => {
                if (item['Group Name'] === expandedGroup) {
                  return (
                    <tr key={item.id}>
                      <td>{item['Group Name']}</td>
                      <td>{item['Company Name']}</td>
                      <td>{item['Project Name']}</td>
                      <td>{item['Capacity (MW)']}</td>
                      <td>{item['Device ID']}</td>
                      <td>{item['CoD']}</td>
                      <td>{item['Device Type']}</td>
                      <td>{item['Registered']}</td>
                    </tr>
                  );
                }
                return null;
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}