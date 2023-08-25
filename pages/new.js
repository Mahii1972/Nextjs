import React from 'react';
import RadialBarChartPage from '../components/charts';
import LineChartPage from '../components/simple';
import { getCookie } from '../cookieUtils';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


export default function CombinedChartPage() {
  return (
    <div>
      <h1>Energy Data</h1>
      <RadialBarChartPage />
      <LineChartPage />
    </div>
  );
}
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