import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Results = ({ results }) => {
  const [selectedMonths, setSelectedMonths] = useState(new Map());
  const router = useRouter();
  const requirement = router.query.requirement;
  const [remainingRequirement, setRemainingRequirement] = useState(parseInt(requirement));



  const handleMonthClick = (resultIndex, month) => {
    const key = `${resultIndex}-${month}`;
    const currentValue = selectedMonths.get(key);
    let monthValue = parseInt(results[resultIndex][month]);

    // If the requirement has already reached zero, block further selections
    if (!currentValue && remainingRequirement == 0) return;

    // If unselecting a month, add the value back to the requirement
    if(currentValue){
      setRemainingRequirement(prev => prev + monthValue);
    } else {
      // If the remaining requirement will be exceeded by the selected month, adjust the value to fit the remaining requirement
      if (remainingRequirement - monthValue < 0) {
        // Adjust device month value
        results[resultIndex][month] = remainingRequirement;
        // set remaining requirement to zero as, because you have reached your requirement
        setRemainingRequirement(0); 
      } else {
        setRemainingRequirement(prev => prev - monthValue);
      }
    }

    // Toggle the month selection state
    setSelectedMonths((prev) => new Map(prev).set(key, !prev.get(key)));
};

  const handleSubmit = async () => {
    let remainingRequirement = parseInt(requirement);
    const selectedMonthsObject = {};
  
    selectedMonths.forEach((value, key) => {
      if (value && remainingRequirement > 0) {
        const [resultIndex, month] = key.split('-');
        const deviceId = results[parseInt(resultIndex)]['Device ID'];
        if (!selectedMonthsObject[deviceId]) {
          selectedMonthsObject[deviceId] = {};
        }
  
        const monthValue = results[parseInt(resultIndex)][month];
        const adjustedMonthValue = Math.min(remainingRequirement, monthValue);
        selectedMonthsObject[deviceId][month] = adjustedMonthValue;
        remainingRequirement -= adjustedMonthValue;
      }
    });
  
    const response = await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedMonths: selectedMonthsObject }),
    });
    const updatedResults = await response.json();
    console.log(updatedResults);
  
    if (updatedResults.message === 'Database updated successfully') {
      alert('Your order placed');
      router.back();
    }
  };
  

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const visibleMonths = months.filter(month => results.some(result => result[month]));

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <p>Requirement: {remainingRequirement}</p>
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