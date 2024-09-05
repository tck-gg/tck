import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Layout from '@/components/Layout';

import { usePermissions } from '@/hooks/permissions';
import { Paper, SegmentedControl, Table, Title } from '@mantine/core';
import { RoobetLeaderboardSpot } from 'types';

export async function getStaticProps() {
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split('T')[0];
  const response = await axios.get(
    `https://roobetconnect.com/affiliate/stats?userId=0401366b-7c9a-4edf-99e5-90db191b54ed&startDate=${new Date(
      monthStart
    ).toISOString()}`,
    {
      headers: {
        authorization: `Bearer ${process.env.ROOBET_API_KEY}`
      },
      validateStatus: () => {
        return true;
      }
    }
  );
  const roobetData: RoobetLeaderboardSpot[] = response.data;

  if (typeof roobetData === 'string') {
    return {
      props: {
        roobetData: []
      },
      revalidate: 3600
    };
  }

  return {
    props: {
      roobetData
    },
    revalidate: 3600
  };
}

function Leaderboards({ roobetData }: { roobetData: RoobetLeaderboardSpot[] }) {
  const router = useRouter();
  const permissions = usePermissions();

  const [tab, setTab] = useState('roobet');

  useEffect(() => {
    setTimeout(() => {
      if (!permissions.permissions.includes('MANAGE_LEADERBOARDS')) {
        router.push('/');
      }
    }, 3000);
  });

  return (
    <Layout>
      {permissions.permissions.includes('MANAGE_LEADERBOARDS') ? (
        <>
          <Title mb='sm'>Leaderboards</Title>

          <SegmentedControl
            value={tab}
            onChange={setTab}
            data={[
              {
                label: `Roobet`,
                value: 'roobet'
              },
              {
                label: `PackDraw`,
                value: 'packdraw'
              }
            ]}
            mb='sm'
          />

          <Paper shadow='xs' p='md' mb='sm'>
            {tab === 'roobet' && (
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Amount</th>
                    <th>Favorite Game</th>
                  </tr>
                </thead>
                <tbody>
                  {roobetData.map((spot, i) => {
                    return (
                      <tr key={spot.username}>
                        <td>{i + 1}</td>
                        <td>{spot.username}</td>
                        <td>
                          {spot.wagered.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          })}
                        </td>
                        <td>{spot.favoriteGameTitle}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Paper>
        </>
      ) : (
        <p>Missing permissions. Redirecting...</p>
      )}
    </Layout>
  );
}

export default Leaderboards;
