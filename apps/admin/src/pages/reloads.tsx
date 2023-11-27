import { StakeReloadEntry, getStakeReloadEntries } from 'database';
import { useState } from 'react';
import { Button, Group, Text, Title } from '@mantine/core';

import Layout from '@/components/Layout';

export async function getServerSideProps() {
  return {
    props: {
      reloads: await getStakeReloadEntries()
    }
  };
}

function Raffles({ reloads }: { reloads: StakeReloadEntry[] }) {
  const [data, setData] = useState(
    ['Stake Username,Discord Username']
      .concat(
        reloads.map((reload) => {
          return `${reload.stakeUsername},${reload.discordUsername}`;
        })
      )
      .join('\n')
  );

  return (
    <Layout>
      <Title mb='sm'>Stake Reloads</Title>

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
            element.setAttribute('download', 'stake-reloads.csv');

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
    </Layout>
  );
}

export default Raffles;
