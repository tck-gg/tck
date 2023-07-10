import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Flex,
  Group,
  Image,
  Modal,
  NumberInput,
  Space,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from '@mantine/core';
import { IconPhoto, IconPlus, IconUpload, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import { getAllGiveaways } from 'database';
import axios from 'axios';
import { IGiveaway } from 'types';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';

import Layout from '@/components/Layout';

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
  const theme = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [value, setValue] = useState<number | ''>(0);
  const [maxEntries, setMaxEntries] = useState<number | ''>(0);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [images, setImages] = useState<FileWithPath[]>([]);

  useEffect(() => {
    setDisabled(
      !name ||
        !brand ||
        !value ||
        !maxEntries ||
        !endDate ||
        endDate < new Date() ||
        images.length === 0
    );
  }, [name, brand, value, maxEntries, endDate, images]);

  async function handleSubmitGiveaway() {
    setDisabled(true);

    // Data validation.
    if (!name || !brand || !value || !maxEntries || !endDate) {
      return;
    }
    if (value < 0 || maxEntries < 0 || endDate < new Date()) {
      return;
    }

    const response = await axios.post(
      `${getUrl()}/api/v1/giveaway/create-giveaway`,
      {
        name: name.trim(),
        brand: brand.trim(),
        value,
        maxEntries,
        timestampEnd: endDate.getTime(),
        image: Buffer.from(await images[0].arrayBuffer()).toString('base64')
      },
      {
        validateStatus: () => {
          return true;
        }
      }
    );

    if (response.status === 200) {
      console.log('this is a j');
      router.replace(router.asPath);

      close();

      setName('');
      setBrand('');
      setValue(0);
      setMaxEntries(0);
      setEndDate(new Date());
      setImages([]);
    }

    setDisabled(false);
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

      <Modal opened={opened} onClose={close} centered title='Create Giveaway'>
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
          dropdownType='modal'
          value={endDate || new Date()}
          onChange={setEndDate}
          placeholder='Pick date and time'
          clearable
          withAsterisk
          mx='auto'
          maw={400}
          mb='sm'
        />

        <Dropzone
          onDrop={setImages}
          maxSize={1024 * 1024 * 8}
          accept={[MIME_TYPES.png]}
          maxFiles={1}
          mb='sm'
        >
          <Group position='center' spacing='xl' style={{ minHeight: 120, pointerEvents: 'none' }}>
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
              <IconPhoto size='3.2rem' stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size='xl' inline>
                Drag image here or click to select file.
              </Text>
              <Text size='sm' color='dimmed' inline mt={7}>
                Upload one image. Max 8 MB.
              </Text>
            </div>
          </Group>
        </Dropzone>
        <Flex justify='center' mb='sm'>
          {images.map((file) => {
            const url = URL.createObjectURL(file);

            return (
              <Image
                key={file.name}
                src={url}
                imageProps={{
                  onLoad: () => {
                    URL.revokeObjectURL(url);
                  }
                }}
                alt={file.name}
                height={200}
                fit='contain'
              />
            );
          })}
        </Flex>

        <Button onClick={handleSubmitGiveaway} disabled={disabled} fullWidth>
          Create Giveaway
        </Button>
      </Modal>
    </Layout>
  );
}

export default Giveaways;
