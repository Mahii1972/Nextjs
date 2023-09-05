import { useEffect } from 'react';
import Router from 'next/router';
import { getCookie } from '../cookieUtils';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const ChooseDatabase = ({ token, role }) => {

  const handlePlanetScaleClick = () => {
    if (role === 'admin') {
      Router.push('/planetScaleUpload');
    } else {
      alert('Guest not allowed');
    }
  };

  const handleMongoDBClick = () => {
    if (role === 'admin') {
      Router.push('/mongoDBUpload');
    } else {
      alert('Guest not allowed');
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="gradient"
        className="rounded-full"
        onClick={handlePlanetScaleClick}
      >
        PlanetScale
      </Button>
      <Button
        variant="gradient"
        className="rounded-full"
        onClick={handleMongoDBClick}
      >
        MongoDB
      </Button>
    </div>
  );
};

export async function getServerSideProps(context) {
  const token = getCookie(context.req, 'auth');
  let decoded;
  let role = 'guest';

  try {
    decoded = jwt.verify(token, JWT_SECRET);
    role = decoded.role;
  } catch (err) {
    // If the token is not valid or not present, redirect to the login page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: { token, role } };
}

export default ChooseDatabase;