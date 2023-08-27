import React, { useState } from 'react';

const Results = ({ results }) => {
  const [selectedMonths, setSelectedMonths] = useState(new Map());

  const handleMonthClick = (resultIndex, month) => {
    const key = `${resultIndex}-${month}`;
    setSelectedMonths((prev) => new Map(prev).set(key, !prev.get(key)));
  };

  const handleSubmit = async () => {
    // Update the database with the selected values
    const response = await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedMonths }),
    });
    const updatedResults = await response.json();
    console.log(updatedResults);
    // Update the results state with the updated values from the database
  };
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
              {visibleMonths.map((month ) => (
                 <td
                 key={month}
                 className={`border px-4 py-2 cursor-pointer ${
                   selectedMonths.get(`${index}-${month }`) ? 'bg-indigo-200' : ''
                 }`}
                 onClick={() => handleMonthClick(index, month)}
               >
                 {result[month]}
               </td>
              ))}
              <td className="border px-4 py-2">{result.Total_Production}</td>
            </tr>
          ))}
        </tbody>
      </table>
       <button
        type="button"
        onClick={handleSubmit}
        className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </div>
  );
};

export default Results;
