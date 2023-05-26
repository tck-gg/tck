import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <>
        <Header />
        <div id='content'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </>
    </>
  );
}

export default App;
