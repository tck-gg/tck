import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Auth({ children }: { children: React.ReactNode }) {
  const [cookie, setCookie] = useCookies(['authorization']);

  const [isAuth, setIsAuth] = useState(false);

  function reject() {
    window.location.href =
      process.env.NODE_ENV === 'production'
        ? 'http://tck.hunterparcells.com' || 'https://tck.gg'
        : 'http://localhost:8000';
  }

  useEffect(() => {
    (async () => {
      if (cookie.authorization) {
        let response;
        try {
          response = await axios.post(
            `${
              process.env.NODE_ENV === 'production'
                ? 'http://tck.hunterparcells.com'
                : 'http://localhost:8000'
            }/api/v1/user/validate-authorization`,
            {
              authorization: cookie.authorization
            }
          );
        } catch (error) {
          setCookie('authorization', '', { maxAge: 0, domain: 'hunterparcells.com' });
          reject();
          return;
        }

        const user = response.data.user;
        if (!user || !user?.isAdmin) {
          reject();
          return;
        }

        setCookie('authorization', cookie.authorization, {
          maxAge: 3600,
          domain: 'hunterparcells.com'
        });

        setIsAuth(true);
        return;
      }
      window.location.href = `${
        process.env.NODE_ENV === 'production'
          ? 'https://tck.hunterparcells.com'
          : 'http://localhost:8000'
      }/login?redirect=${encodeURIComponent(window.location.href)}&rememberMe=true`;
    })();
  }, [cookie.authorization, setCookie]);

  return <>{isAuth && children}</>;
}

export default Auth;
