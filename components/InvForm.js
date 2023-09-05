import axios from 'axios';
import { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
} from '@material-tailwind/react';

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
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Enter Details
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col gap-6">
        <Input size="lg" label="Group Name" name="groupName" onChange={handleChange} required />
        <Input size="lg" label="Company Name" name="companyName" onChange={handleChange} required />
        <Input size="lg" label="Project Name" name="projectName" onChange={handleChange} required />
        <Input size="lg" label="Capacity (MW)" type="number" name="capacityMW" onChange={handleChange} required />
        <Input size="lg" label="Device ID" name="deviceId" onChange={handleChange} required />
        <Input size="lg" label="Device Type" name="deviceType" onChange={handleChange} required />
        <Input size="lg" label="Registered" name="registered" onChange={handleChange} required />
        <Input size="lg" label="CoD" type="date" name="cod" onChange={handleChange} required />
        <Button className="mt-6" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default InsertDataForm;