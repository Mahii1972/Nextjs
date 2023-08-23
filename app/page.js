import { useEffect, useState } from 'react';
import Router from 'next/router';

const HomePage = () => {
  const [message, setMessage] = useState('Redirecting to LoginPage.Please Wait!');

  useEffect(() => {
    setTimeout(() => {
      Router.push('/login');
    }, 1000);
  }, []);

  return <div>{message}</div>;
};

export default HomePage;