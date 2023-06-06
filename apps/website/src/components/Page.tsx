import Head from 'next/head';

import BanBanner from './BanBanner/BanBanner';

import { useAuth } from '@/hooks/auth';

function Page({ title, children }: { title?: string; children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <>
      <Head>
        <meta property='og:title' content={`${title ? `${title} - ` : ''}TCK`} />

        <title>{`${title ? `${title} - ` : ''}TCK`}</title>
      </Head>
      {children}
    </>
  );
}

export default Page;
