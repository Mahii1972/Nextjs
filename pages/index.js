import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [message, setMessage] = useState('Redirecting to LoginPage.Please Wait!');
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  }, []);

  return <div>{message}</div>;
};

export default HomePage;