import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import ReactGA from 'react-ga4';
import { Notifications } from '@mantine/notifications';

import ReAuth from '@/components/ReAuth';
import BanBanner from '@/components/BanBanner/BanBanner';

import AgeVerification from '@/components/AgeVerification/AgeVerification';
import TheProviderProvider from '@/components/TheProviderProvider';
import ModalProfile from '@/components/ModalProfile/ModalProfile';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize('G-Q3TE3P2QCN');
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <TheProviderProvider>
        <AgeVerification />
        <BanBanner />
        <ModalProfile />
        <ReAuth>
          <Component {...pageProps} />
        </ReAuth>
      </TheProviderProvider>
      <Notifications />
    </>
  );
}

export default App;
