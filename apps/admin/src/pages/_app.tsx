import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { CookiesProvider } from 'react-cookie';
import { Notifications } from '@mantine/notifications';

import Auth from '@/components/Auth';

import '../styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark'
        }}
      >
        <Notifications />
        <CookiesProvider>
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </CookiesProvider>
      </MantineProvider>
    </>
  );
}

export default App;
