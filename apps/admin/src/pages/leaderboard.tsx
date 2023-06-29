import { useRouter } from 'next/router';
import { useState } from 'react';
import { Title, Group, Text, useMantineTheme, rem, SegmentedControl, Table } from '@mantine/core';
import { IconUpload, IconX, IconFileSpreadsheet } from '@tabler/icons-react';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Prisma, getLeaderboard } from 'database';

import Layout from '@/components/Layout';

import { getContents } from '@/util/reader';

type ILeaderboard = Prisma.LeaderboardGetPayload<{
  include: { spots: true };
}>;

function getUrl() {
  if (process.env.NODE_ENV === 'production') {
    if (!window.location.hostname.includes('localhost')) {
      return 'https://tck.hunterparcells.com';
    }
    return 'http://localhost:8007';
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }
  return '';
}

export async function getServerSideProps() {
  return {
    props: {
      leaderboards: {
        stake: await getLeaderboard('stake'),
        gamdom: await getLeaderboard('gamdom'),
        csgoroll: await getLeaderboard('csgoroll'),
        hypedrop: await getLeaderboard('hypedrop')
      }
    }
  };
}

function LeaderboardPage({
  leaderboards
}: {
  leaderboards: {
    [key: string]: ILeaderboard;
  };
}) {
  const theme = useMantineTheme();
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<string>('stake');
  const [cookie, setCookie] = useCookies(['authorization']);
  const router = useRouter();

  async function handleDrop(file: FileWithPath) {
    const contents = await getContents(file);

    if (!contents) {
      return;
    }
    const content = contents.toString();

    if (content.includes('Wager $')) {
      // Stake
      const data = content
        .split('\r\n')
        .slice(1)
        .map((line) => {
          return line.split(',').splice(1, 2);
        })
        .map((line) => {
          return {
            username: line[0],
            amount: parseInt(line[1])
          };
        })
        .splice(0, 10);

      const response = await axios.post(
        `${getUrl()}/api/v1/leaderboard/update`,
        {
          type: 'stake',
          data
        },
        {
          headers: {
            Authorization: cookie.authorization
          }
        }
      );
      if (response.status === 200) {
        router.replace(router.asPath);
      }
    }
  }

  return (
    <Layout>
      <Title mb='sm'>Leaderboard</Title>
      <SegmentedControl
        value={selectedLeaderboard}
        onChange={setSelectedLeaderboard}
        data={[
          { label: 'Stake', value: 'stake' },
          { label: 'Gamdom', value: 'gamdom' },
          { label: 'CSGORoll', value: 'csgoroll' },
          { label: 'HypeDrop', value: 'hypedrop' }
        ]}
        mb='sm'
      />
      {selectedLeaderboard === 'stake' ? (
        <Dropzone
          onDrop={(files) => {
            handleDrop(files[0]);
          }}
          maxSize={3 * 1024 ** 2}
          accept={[MIME_TYPES.csv]}
          maxFiles={1}
          mb='md'
        >
          <Group
            position='center'
            spacing='xl'
            style={{ minHeight: rem(100), pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                size='3.2rem'
                stroke={1.5}
                color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size='3.2rem'
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFileSpreadsheet size='3.2rem' stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size='xl' inline>
                Drag CSV here or click to select file.
              </Text>
              <Text size='sm' color='dimmed' inline mt={7}>
                Upload leaderboard CSV file. Max 5 MB.
              </Text>
            </div>
          </Group>
        </Dropzone>
      ) : null}
      {leaderboards[selectedLeaderboard].spots.length > 0 ? (
        <>
          <Table striped highlightOnHover withBorder>
            <thead>
              <tr>
                <th>Username</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {leaderboards[selectedLeaderboard].spots.map((spot) => {
                return (
                  <tr key={spot.id}>
                    <td>{spot.username}</td>
                    <td>{spot.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <Text>No leaderboard uploaded.</Text>
      )}
    </Layout>
  );
}

export default LeaderboardPage;
