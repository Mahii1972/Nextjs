// components/Cards.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';

async function fetchData() {
  const response = await fetch('/api/cardapi');
  const data = await response.json();
  return data;
}

export function CardCommitted() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
        {data.committed_percentage.toFixed(2)}% Commited
        </Typography>
        <Typography>of Total predicted</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography>2023</Typography>
      </CardFooter>
    </Card>
  );
}

export function CardIssued() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
        {data.issued_percentage.toFixed(2)}% Issued
        </Typography>
        <Typography> of total Predcted (Kwh) </Typography>
      </CardBody>
      <CardFooter className="pt-0">
      <Typography>2023</Typography>
      </CardFooter>
    </Card>
  );
}

export function CardDevices() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
        {data.committed_devices} out of {data.total_devices}
        </Typography>
        <Typography>
          Device Commited
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
  <Link href="/table">   
      <Button>Click to Commit</Button>
  </Link>
</CardFooter>
    </Card>
  );
}