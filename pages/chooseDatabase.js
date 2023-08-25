import { useEffect } from 'react';
import Router from 'next/router';
import { getCookie } from '../cookieUtils';
import jwt from 'jsonwebtoken';
import Link from 'next/link';

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
    <div>
      <button onClick={handlePlanetScaleClick}>PlanetScale</button>
      <button onClick={handleMongoDBClick}>MongoDB</button>
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