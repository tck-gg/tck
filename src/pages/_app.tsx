import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import ReactGA from 'react-ga4';

import { ProvideAuth } from '@/hooks/auth';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.scss';
import { MantineProvider } from '@mantine/core';

function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   // Google Analytics
  //   if (process.env.NODE_ENV === 'production') {
  //     ReactGA.initialize('G-PPF6YEH1XJ');
  //     ReactGA.send({
  //       hitType: 'pageview',
  //       page: window.location.pathname
  //     });
  //   }
  // }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <CookiesProvider>
        <ProvideAuth>
          <MantineProvider
            theme={{
              colorScheme: 'dark',
              fontFamily: 'Archivo, sans-serif'
            }}
          >
            <Component {...pageProps} />
          </MantineProvider>
        </ProvideAuth>
      </CookiesProvider>
    </>
  );
}

export default App;
