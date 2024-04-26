import { RoobetReloadEntry, getRoobetReloadEntries } from 'database';
import { useEffect, useState } from 'react';
import { Button, Group, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';

import { usePermissions } from '@/hooks/permissions';

export async function getServerSideProps() {
  return {
    props: {
      reloads: await getRoobetReloadEntries()
    }
  };
}

function Raffles({ reloads }: { reloads: RoobetReloadEntry[] }) {
  const permissions = usePermissions();
  const router = useRouter();
  const [data, setData] = useState(
    ['Roobet Username,Discord Username']
      .concat(
        reloads.map((reload) => {
          return `${reload.roobetUsername},${reload.discordUsername}`;
        })
      )
      .join('\n')
  );

  useEffect(() => {
    setTimeout(() => {
      if (!permissions.permissions.includes('MANAGE_RELOADS')) {
        router.push('/');
      }
    }, 3000);
  });

  return (
    <Layout>
      {permissions.permissions.includes('MANAGE_RELOADS') ? (
        <>
          <Title mb='sm'>Roobet Reloads</Title>

          <Text mb='sm'>CSV. Copy and paste as CSV.</Text>

          <Group mb='sm'>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(data);
              }}
            >
              Copy All
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(data.split('\n').slice(1).join('\n'));
              }}
            >
              Copy Data Only
            </Button>
          </Group>
          <Group mb='sm'>
            <Button
              onClick={() => {
                const element = document.createElement('a');
                element.setAttribute(
                  'href',
                  `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`
                );
                element.setAttribute('download', 'roobet-reloads.csv');

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
              }}
            >
              Download as .csv
            </Button>
          </Group>

          <textarea
            value={data}
            style={{
              width: '100%',
              height: '500px'
            }}
          />
        </>
      ) : (
        <p>Missing permissions. Redirecting...</p>
      )}
    </Layout>
  );
}

export default Raffles;
