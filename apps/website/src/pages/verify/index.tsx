/* eslint-disable react-hooks/exhaustive-deps */

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import Layout from '@/components/Layout/Layout';

import classes from './verify.module.scss';

function Verify() {
  const router = useRouter();

  const [isVerified, setIsVerified] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    (async () => {
      if (!router.query.uuid) {
        return;
      }

      const uuid = router.query.uuid;
      if (!uuid) {
        router.push('/');
      }

      const response = await axios.post(
        '/api/v1/user/verify',
        {
          uuid
        },
        {
          validateStatus: () => {
            return true;
          }
        }
      );

      if (response.status === 200) {
        setIsVerified(true);
        setTimeout(() => {
          router.push('/login');
        }, 5000);
      } else {
        setHasErrored(true);
      }
    })();
  }, [router]);

  return (
    <Layout title='Verify Account'>
      <div className={classes.root}>
        {isVerified ? (
          <>
            <p>Your account has been verified. Redirecting to login in 5 seconds.</p>
            <p>
              Click <Link href='/login'>here</Link> to redirect now.
            </p>
          </>
        ) : hasErrored ? (
          <p>An error has occurred. Try again later.</p>
        ) : (
          <p>Verifying your account...</p>
        )}
      </div>
    </Layout>
  );
}

export default Verify;
