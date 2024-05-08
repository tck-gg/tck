/* eslint-disable react-hooks/exhaustive-deps */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

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

function AccountConnections({ username }: { username: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cookie, setCookie] = useCookies(['authorization']);
  const [connections, setConnections] = useState<{
    kick: string;
    discord: string;
    roobet: string;
  }>({
    kick: '',
    discord: '',
    roobet: ''
  });

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${getUrl()}/api/v1/user/connections`, {
        params: {
          username
        },
        headers: {
          authorization: cookie.authorization
        }
      });
      const fetched = response.data;

      setConnections(fetched);

      setIsLoading(false);
    })();
  }, [username]);

  return (
    <>
      {!isLoading ? (
        <>
          {connections.kick ? (
            <div>
              <strong>Kick</strong>: {connections.kick}
            </div>
          ) : null}
          {connections.discord ? (
            <div>
              <strong>Discord</strong>: {connections.discord}
            </div>
          ) : null}
          {connections.roobet ? (
            <div>
              <strong>Roobet</strong>: {connections.roobet}
            </div>
          ) : null}

          {Object.values(connections).filter((value) => {
            return value;
          }).length === 0 && <div>No connections found.</div>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default AccountConnections;
