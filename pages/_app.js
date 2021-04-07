import Layout from '../components/layout/Layout';
import '../styles/globals.css';

// Wrap all pages with Layout component.
const MyApp = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
