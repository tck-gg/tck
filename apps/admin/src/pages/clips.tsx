import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Title } from '@mantine/core';

import Layout from '@/components/Layout';

import { getAdminPanelClips } from 'database';

import { usePermissions } from '@/hooks/permissions';

import { AdminPanelClip } from 'types';

export async function getServerSideProps() {
  const pendingClips = await getAdminPanelClips();

  return {
    props: {
      pendingClips
    }
  };
}

function Raffles({ pendingClips }: { pendingClips: AdminPanelClip[] }) {
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
          <Title mb='sm'>Clips</Title>
          <p>{JSON.stringify(pendingClips)}</p>
        </>
      ) : (
        <p>Missing permissions. Redirecting...</p>
      )}
    </Layout>
  );
}

export default Raffles;
