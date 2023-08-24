"use client"
import { useState } from 'react';
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
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={onFormSubmit} className="space-y-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
