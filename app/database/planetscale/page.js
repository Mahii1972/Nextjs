"use client"
import { useState } from 'react';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';

export default function Upload() {

  const [file, setFile] = useState();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/planetScaleUpload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      alert('Upload failed');
      return;
    }

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button
        variant="gradient"
        className="rounded-full"
        type="submit"
      >
        Upload
      </Button>
      <Link href="/logout">
        <Button
          variant="gradient"
          className="rounded-full"
        >
          Logout
        </Button>
      </Link>
    </form>
  );
};