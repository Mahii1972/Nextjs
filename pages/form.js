// pages/index.js
import InvForm from '../components/InvForm';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
import { getCookie } from '../cookieUtils';



export default function Home() {
  return (
    <div>
      <InvForm />
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