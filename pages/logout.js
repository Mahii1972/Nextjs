import { useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

const Logout = () => {
  useEffect(() => {
    // Remove the JWT token from the cookie
    Cookies.remove('auth'); // Update the cookie name to 'auth'

    // Redirect to the login page after a short delay
    setTimeout(() => {
      Router.push('/login');
    }, 2000);
  }, []);

  return <div>Logging out...</div>;
};

export default Logout