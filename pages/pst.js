import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const page = context.query.page || 1;
  const res = await fetch(`http://localhost:3000/api/data?page=${page}`);
  const data = await res.json();

  return {
    props: {
      data,
      currentPage: parseInt(page),
    },
  };
}

export default function Home({ data, currentPage }) {
  const router = useRouter();
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    if (page !== currentPage) {
      router.push(`/pst?page=${page}`);
    }
  }, [page]);

  return (
    <div>
      <h1>Data</h1>
      <style jsx>{`
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      `}</style>
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
            data.map((item) => (
              <tr key={item.id}>
                <td>{item["Group Name"]}</td>
                <td>{item["Company Name"]}</td>
                <td>{item["Project Name"]}</td>
                <td>{item["Capacity (MW)"]}</td>
                <td>{item["Device ID"]}</td>
                <td>{item["CoD"]}</td>
                <td>{item["Device Type"]}</td>
                <td>{item["Registered"]}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
