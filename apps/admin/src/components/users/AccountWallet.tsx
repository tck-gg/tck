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

function AccountWallet({ username }: { username: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cookie, setCookie] = useCookies(['authorization']);
  const [wallet, setWallet] = useState<{
    bitcoin: string;
    ethereum: string;
    litecoin: string;
    steamTradeUrl: string;
  }>({
    bitcoin: '',
    ethereum: '',
    litecoin: '',
    steamTradeUrl: ''
  });

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${getUrl()}/api/v1/user/wallet`, {
        params: {
          username
        },
        headers: {
          authorization: cookie.authorization
        }
      });
      const fetched = response.data;

      setWallet(fetched);

      setIsLoading(false);
    })();
  }, [username]);

  return (
    <>
      {!isLoading ? (
        <>
          {wallet.bitcoin ? (
            <div>
              <strong>Bitcoin</strong>: {wallet.bitcoin}
            </div>
          ) : null}
          {wallet.ethereum ? (
            <div>
              <strong>Ethereum</strong>: {wallet.ethereum}
            </div>
          ) : null}
          {wallet.litecoin ? (
            <div>
              <strong>Litecoin</strong>: {wallet.litecoin}
            </div>
          ) : null}
          {wallet.steamTradeUrl ? (
            <div>
              <strong>Steam Trade URL</strong>:{' '}
              <a href={wallet.steamTradeUrl} target='_blank'>
                {wallet.steamTradeUrl}
              </a>
            </div>
          ) : null}

          {Object.values(wallet).filter((value) => {
            return value;
          }).length === 0 && <div>No wallets found.</div>}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default AccountWallet;
