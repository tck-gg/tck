/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Auth({ children }: { children: React.ReactNode }) {
  const [cookie, setCookie] = useCookies(['authorization']);

  const [isAuth, setIsAuth] = useState(false);

  function getUrl() {
    if (process.env.NODE_ENV === 'production') {
      if (!window.location.hostname.includes('localhost')) {
        return 'https://tck.gg';
      }
      return 'http://localhost:8007';
    }
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:8000';
    }
    return '';
  }

  function reject() {
    window.location.href = getUrl();
  }

  useEffect(() => {
    (async () => {
      if (cookie.authorization) {
        let response;
        try {
          const url = getUrl();
          response = await axios.post(`${url}/api/v1/user/validate-authorization`, {
            authorization: cookie.authorization
          });
        } catch (error) {
          setCookie('authorization', '', {
            maxAge: 0,
            domain:
              process.env.NODE_ENV === 'production' &&
              !window.location.hostname.includes('localhost')
                ? process.env.NEXT_PUBLIC_PRODUCTION_COOKIE_DOMAIN
                : 'localhost'
          });
          reject();
          return;
        }

        const user = response.data.user;
        if (!user || !user?.permissions.includes('ACCESS_ADMIN_PANEL')) {
          reject();
          return;
        }

        setCookie('authorization', cookie.authorization, {
          maxAge: 3600,
          domain:
            process.env.NODE_ENV === 'production' && !window.location.hostname.includes('localhost')
              ? process.env.NEXT_PUBLIC_PRODUCTION_COOKIE_DOMAIN
              : 'localhost'
        });

        setIsAuth(true);
        return;
      }
      window.location.href = `${getUrl()}/login?redirect=${encodeURIComponent(
        window.location.href
      )}&rememberMe=true`;
    })();
  }, []);

  return <>{isAuth && children}</>;
}

export default Auth;
