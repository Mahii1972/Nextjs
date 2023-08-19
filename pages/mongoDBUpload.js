import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { getCookie } from '../cookieUtils';
import jwt from 'jsonwebtoken';

export default function Upload({ token }) {

  const [file, setFile] = useState();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/mongoDBUpload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) {
      const { message } = await response.json();
      alert(message);
      return;
    }

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
      <Link href="/logout">
        <button>Logout</button>
      </Link>
    </form>
  );
}

export async function getServerSideProps(context) {
  const token = getCookie(context.req, 'auth');

  // Check if the token exists and has the 'admin' role
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (decodedToken.role === 'admin') {
        return {
          props: { token },
        };
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  // Redirect to the login page if the user is not an admin
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}