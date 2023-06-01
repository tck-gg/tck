import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ProvideAuth } from '@/hooks/auth';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.scss';

import classes from './_app.module.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <CookiesProvider>
        <ProvideAuth>
          <Header />
          <div className={classes.content}>
            <Component {...pageProps} />
          </div>
          <Footer />
        </ProvideAuth>
      </CookiesProvider>
    </>
  );
}

export default App;
