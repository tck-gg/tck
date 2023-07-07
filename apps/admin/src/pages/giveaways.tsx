import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Modal, NumberInput, Space, TextInput, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import { getAllGiveaways, Prisma } from 'database';
import axios from 'axios';

import Layout from '@/components/Layout';

type IGiveaway = Prisma.GiveawayGetPayload<{
  include: {
    entries: true;
  };
}>;

export async function getServerSideProps() {
  return {
    props: {
      giveaways: await getAllGiveaways()
    }
  };
}

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

function Giveaways({
  giveaways
}: {
  giveaways: {
    currentGiveaways: IGiveaway[];
    pastGiveaways: IGiveaway[];
  };
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [value, setValue] = useState<number | ''>(0);
  const [maxEntries, setMaxEntries] = useState<number | ''>(0);
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    setDisabled(!name || !brand || !value || !maxEntries || !endDate || endDate < new Date());
  }, [name, brand, value, maxEntries, endDate]);

  async function handleSubmitGiveaway() {
    // Data validation.
    if (!name || !brand || !value || !maxEntries || !endDate) {
      return;
    }
    if (value < 0 || maxEntries < 0 || endDate < new Date()) {
      return;
    }

    const response = await axios.post(`${getUrl()}/api/v1/giveaway/create-giveaway`, {
      name: name.trim(),
      brand: brand.trim(),
      value,
      maxEntries,
      timestampEnd: endDate.getTime()
    });
    if (response.status === 200) {
      router.replace(router.asPath);

      close();

      setName('');
      setBrand('');
      setValue(0);
      setMaxEntries(0);
      setEndDate(new Date());
    }
  }

  return (
    <Layout>
      <Title mb='sm'>Giveaways</Title>
      <Title order={2} mb='sm'>
        Active Giveaways
      </Title>
      <Button leftIcon={<IconPlus />} onClick={open}>
        New Giveaway
      </Button>
      <p>{JSON.stringify(giveaways.currentGiveaways)}</p>

      <Space h='md' />

      <Title order={2}>Previous Giveaways</Title>
      <p>{JSON.stringify(giveaways.pastGiveaways)}</p>

      <Modal opened={opened} onClose={close} title='New Giveaway' centered>
        <TextInput
          value={name}
          onChange={(e) => {
            return setName(e.currentTarget.value);
          }}
          label='Item Name'
          placeholder='PlayStation 5'
          withAsterisk
          mb='sm'
        />
        <TextInput
          value={brand}
          onChange={(e) => {
            return setBrand(e.currentTarget.value);
          }}
          label='Item Brand'
          placeholder='Sony'
          withAsterisk
          mb='sm'
        />
        <NumberInput
          value={value}
          onChange={setValue}
          label='Item Value'
          placeholder='549.00'
          withAsterisk
          mb='sm'
        />
        <NumberInput
          value={maxEntries}
          onChange={setMaxEntries}
          label='Max Entries'
          placeholder='500'
          withAsterisk
          mb='sm'
        />
        <DateTimePicker
          label='End Date'
          date={endDate || new Date()}
          onChange={setEndDate}
          placeholder='Pick date and time'
          clearable
          withAsterisk
          mx='auto'
          maw={400}
          mb='xl'
        />

        <Button onClick={handleSubmitGiveaway} disabled={disabled} fullWidth>
          Create Giveaway
        </Button>
      </Modal>
    </Layout>
  );
}

export default Giveaways;
