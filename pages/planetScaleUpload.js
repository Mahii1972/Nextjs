import { useState } from 'react';
import Router from 'next/router';
import { getCookie } from '../cookieUtils';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
import { Button } from '@material-tailwind/react';


export default function Upload({ token }) {

  const [file, setFile] = useState();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/planetScaleUpload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (response.status === 403) {
      alert('Upload files not authorized');
      return;
    }

    if (!response.ok) {
      alert('Upload files not authorized');
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
