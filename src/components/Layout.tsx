import { useEffect } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import axios, { AxiosResponse } from 'axios';

import { useAuth } from '@/hooks/auth';

import { ISafeUser } from '@/database/models/user';

function Layout({ title, children }: { title?: string; children: React.ReactNode }) {
  const auth = useAuth();

  const [cookie, setCookie] = useCookies(['authorization']);

  useEffect(() => {
    (async () => {
      if (cookie.authorization) {
        // Re-Login
        let response: AxiosResponse<{ user: ISafeUser }>;
        try {
          response = await axios.post('/api/v1/user/validate-authorization', {
            authorization: cookie.authorization
          });
        } catch (error) {
          setCookie('authorization', '', { maxAge: 0 });
          return;
        }
        setCookie('authorization', cookie.authorization, { maxAge: 3600 });
        auth.setNewUser(response.data.user);
      }
    })();
  }, []);

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

export default Layout;
