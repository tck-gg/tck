/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import { useAuth } from '@/hooks/auth';

function Page({ title, children }: { title?: string; children: React.ReactNode }) {
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
