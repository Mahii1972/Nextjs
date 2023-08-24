'use client'
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
    console.log(data); // Add this line
    await axios.post('/api/submitForm', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => console.log(res))
    .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} name="groupName" placeholder="Group Name" required /><br/>
      <input type="text" onChange={handleChange} name="companyName" placeholder="Company Name" required /><br/>
      <input type="text" onChange={handleChange} name="projectName" placeholder="Project Name" required /><br/>
      <input type="number" onChange={handleChange} name="capacityMW" placeholder="Capacity (MW)" required /><br/>
      <input type="text" onChange={handleChange} name="deviceId" placeholder="Device ID" required /><br/>
      <input type="text" onChange={handleChange} name="deviceType" placeholder="Device Type" required /><br/>
      <input type="text" onChange={handleChange} name="registered" placeholder="Registered" required /><br/>
      <input type="date" onChange={handleChange} name="cod" placeholder="CoD" required /><br/>

      <button type="submit">Submit</button>
    </form>
  )
}

export default InsertDataForm;