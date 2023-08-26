import Sidebar from '../components/sidebar';
import '../styles/globals.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const results = router.query.results ? JSON.parse(router.query.results) : [];

  return (
    <Sidebar>
      <Component {...pageProps} results={results} />
    </Sidebar>
  );
}

export default MyApp;
