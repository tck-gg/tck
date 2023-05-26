import type { AppProps } from 'next/app';
import Head from 'next/head';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import '../styles/globals.scss';
import classes from './_app.module.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <>
        <Header />
        <div className={classes.content}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </>
    </>
  );
}

export default App;
