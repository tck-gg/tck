/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import { useAuth } from '@/hooks/auth';

function ReAuth({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  const [cookie, setCookie] = useCookies(['authorization']);

  useEffect(() => {
    (async () => {
      if (cookie.authorization) {
        // Re-Login
        let response;
        try {
          response = await axios.post('/api/v1/user/validate-authorization', {
            authorization: cookie.authorization
          });
        } catch (error) {
          setCookie('authorization', '', { maxAge: 0, domain: window.location.hostname });
          return;
        }
        setCookie('authorization', cookie.authorization, {
          maxAge: 3600,
          domain: window.location.hostname
        });
        auth.setNewUser(response.data.user);
      }
    })();
  }, []);

  return <>{children}</>;
}

export default ReAuth;
