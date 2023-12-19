import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Layout from '@/components/Layout';

import { usePermissions } from '@/hooks/permissions';

function Raffles() {
  const router = useRouter();
  const permissions = usePermissions();

  useEffect(() => {
    setTimeout(() => {
      if (!permissions.permissions.includes('MANAGE_RAFFLES')) {
        router.push('/');
      }
    }, 3000);
  });

  return (
    <Layout>
      {permissions.permissions.includes('MANAGE_RAFFLES') ? (
        <>
          <p>Raffles</p>
        </>
      ) : (
        <p>Missing permissions. Redirecting...</p>
      )}
    </Layout>
  );
}

export default Raffles;
