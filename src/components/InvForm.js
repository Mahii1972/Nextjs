"use client"
import axios from 'axios';
import { useState } from 'react';

const InsertDataForm = () => {
  const [data, setData] = useState({
    groupName: '',
    companyName: '',
    projectName: '',
    capacityMW: '',
    deviceId: '',
    deviceType: '',
    registered: '',
    cod: ''
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', data);
    await axios.post('/api/submitForm', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log('Response data:', res.data);
    })
    .catch(error => console.error(error));
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" onChange={handleChange} name="groupName" placeholder="Group Name" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" /><br/>
      <input type="text" onChange={handleChange} name="companyName" placeholder="Company Name" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" /><br/>
      <input type="text" onChange={handleChange} name="projectName" placeholder="Project Name" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" /><br/>
      <input type="number" onChange={handleChange} name="capacityMW" placeholder="Capacity (MW)" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" /><br/>
      <input type="text" onChange={handleChange} name="deviceId" placeholder="Device ID" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" /><br/>
      <input type="text" onChange={handleChange} name="deviceType" placeholder="Device Type" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" /><br/>
      <input type="text" onChange={handleChange} name="registered" placeholder="Registered" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" /><br/>
      <input type="date" onChange={handleChange} name="cod" placeholder="CoD" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" /><br/>

      <button type="submit" className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">Submit</button>
    </form>
  )
}

export default InsertDataForm;
