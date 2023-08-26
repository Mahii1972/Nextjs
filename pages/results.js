import React from 'react';

const Results = ({ results }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const visibleMonths = months.filter(month => results.some(result => result[month]));

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">Device ID</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">CoD</th>
            <th className="px-4 py-2">Committed</th>
            {visibleMonths.map((month, index) => (
              <th key={index} className="px-4 py-2">{month}</th>
            ))}
            <th className="px-4 py-2">Total Production</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border px-4 py-2">{result['Device ID']}</td>
              <td className="border px-4 py-2">{result.Year}</td>
              <td className="border px-4 py-2">{result.Type}</td>
              <td className="border px-4 py-2">{result.CoD}</td>
              <td className="border px-4 py-2">{result.Committed}</td>
              {visibleMonths.map((month, index) => (
                <td key={index} className="border px-4 py-2">{result[month]}</td>
              ))}
              <td className="border px-4 py-2">{result.Total_Production}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
