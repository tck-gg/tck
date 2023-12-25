import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Anchor,
  Button,
  Flex,
  Group,
  Image,
  Modal,
  NumberInput,
  Space,
  Table,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from '@mantine/core';
import { IconCheck, IconPhoto, IconPlus, IconUpload, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import { getAllGiveaways } from 'database';
import axios from 'axios';
import { ISafeGiveaway } from 'types';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import dateFormat from 'dateformat';
import { notifications } from '@mantine/notifications';

import { usePermissions } from '@/hooks/permissions';

import Layout from '@/components/Layout';

export async function getServerSideProps() {
  const giveaways = await getAllGiveaways();

  return {
    props: {
      giveaways
    }
  };
}

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

function Giveaways({
  giveaways
}: {
  giveaways: {
    currentGiveaways: ISafeGiveaway[];
    pastGiveaways: ISafeGiveaway[];
  };
}) {
  const theme = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const router = useRouter();
  const permissions = usePermissions();

  const [disabled, setDisabled] = useState(false);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [value, setValue] = useState<number | ''>(0);
  const [maxEntries, setMaxEntries] = useState<number | ''>(0);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [images, setImages] = useState<FileWithPath[]>([]);

  const [editId, setEditId] = useState('');

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!permissions.permissions.includes('MANAGE_GIVEAWAYS')) {
        router.push('/');
      }
    }, 3000);
  });

  useEffect(() => {
    setDisabled(
      !name ||
        !brand ||
        !value ||
        !maxEntries ||
        !endDate ||
        endDate < new Date() ||
        (modalMode === 'create' && images.length === 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, brand, value, maxEntries, endDate, images]);

  function handleClose() {
    close();

    setName('');
    setBrand('');
    setValue(0);
    setMaxEntries(0);
    setEndDate(new Date());
    setImages([]);

    setEditId('');

    setConfirmDelete(false);
  }

  async function handleSubmitGiveaway() {
    setDisabled(true);

    // Data validation.
    if (!name || !brand || !value || !maxEntries || !endDate) {
      return;
    }
    if (value < 0 || maxEntries < 0 || endDate < new Date()) {
      return;
    }

    let response;
    if (modalMode === 'create') {
      response = await axios.post(
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
    } else {
      response = await axios.post(
        `${getUrl()}/api/v1/giveaway/update-giveaway`,
        {
          id: editId,
          name: name.trim(),
          brand: brand.trim(),
          value,
          maxEntries,
          timestampEnd: endDate.getTime()
        },
        {
          validateStatus: () => {
            return true;
          }
        }
      );
    }

    if (response.status === 403) {
      notifications.show({
        title: 'Error',
        message: 'You are not authorized to do this. Ask the developer for permission.',
        color: 'red',
        icon: <IconX />,
        withBorder: true,
        autoClose: 10000
      });
      return;
    }

    if (response.status === 200) {
      router.replace(router.asPath);

      notifications.show({
        title: `Giveaway ${modalMode === 'create' ? 'created' : 'updated'}`,
        message: `Giveaway for "${name}" has been ${
          modalMode === 'create' ? 'created' : 'updated'
        }.`,
        color: 'teal',
        icon: <IconCheck />,
        withBorder: true,
        autoClose: 10000
      });

      handleClose();
    } else {
      notifications.show({
        title: 'Error',
        message: `An error occurred while ${
          modalMode === 'create' ? 'creating' : 'updating'
        } the giveaway.`,
        color: 'red',
        icon: <IconX />,
        withBorder: true,
        autoClose: 10000
      });
    }
    setDisabled(false);
  }

  function handleCreateClick() {
    setModalMode('create');
    open();
  }

  function handleEditClick(giveaway: ISafeGiveaway) {
    setName(giveaway.name);
    setBrand(giveaway.brand);
    setValue(giveaway.value);
    setMaxEntries(giveaway.maxEntries);
    setEndDate(new Date(giveaway.timestampEnd));

    setModalMode('edit');
    setEditId(giveaway.id);

    open();
  }

  async function handleDeleteClick() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setDisabled(true);

    const response = await axios.post(
      `${getUrl()}/api/v1/giveaway/delete-giveaway`,
      {
        id: editId
      },
      {
        validateStatus: () => {
          return true;
        }
      }
    );

    if (response.status === 403) {
      notifications.show({
        title: 'Error',
        message: 'You are not authorized to do this. Ask the developer for permission.',
        color: 'red',
        icon: <IconX />,
        withBorder: true,
        autoClose: 10000
      });
      return;
    }
    if (response.status === 404) {
      notifications.show({
        title: 'Error',
        message: 'Giveaway not found. Notify the developer.',
        color: 'red',
        icon: <IconX />,
        withBorder: true,
        autoClose: 10000
      });
      return;
    }

    if (response.status === 200) {
      router.replace(router.asPath);

      notifications.show({
        title: 'Giveaway deleted',
        message: `Giveaway for "${name}" has been deleted.`,
        color: 'teal',
        icon: <IconCheck />,
        withBorder: true,
        autoClose: 10000
      });

      handleClose();
    } else {
      notifications.show({
        title: 'Error',
        message: 'An error occurred while deleting the giveaway.',
        color: 'red',
        icon: <IconX />,
        withBorder: true,
        autoClose: 10000
      });
    }

    setDisabled(false);
  }

  return (
    <Layout>
      {permissions.permissions.includes('MANAGE_GIVEAWAYS') ? (
        <>
          <Title mb='sm'>Giveaways</Title>
          <Title order={2} mb='sm'>
            Active Giveaways
          </Title>

          <Button leftIcon={<IconPlus />} onClick={handleCreateClick} mb='sm'>
            New Giveaway
          </Button>

          {giveaways.currentGiveaways.length > 0 ? (
            <Table highlightOnHover withBorder>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Brand</th>
                  <th>Value</th>
                  <th>Entries</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {giveaways.currentGiveaways.map((giveaway: ISafeGiveaway) => {
                  return (
                    <tr key={giveaway.id}>
                      <td>{giveaway.name}</td>
                      <td>{giveaway.brand}</td>
                      <td>${giveaway.value.toLocaleString('en-US')}</td>
                      <td>
                        {giveaway.entries.length}/{giveaway.maxEntries}
                      </td>
                      <td>
                        {dateFormat(giveaway.timestampEnd, 'yyyy-mm-dd HH:MM:ss')} (in{' '}
                        {Math.floor((giveaway.timestampEnd - Date.now()) / 1000 / 60 / 60 / 24)}{' '}
                        days)
                      </td>
                      <td>
                        <Anchor
                          component='button'
                          onClick={() => {
                            handleEditClick(giveaway);
                          }}
                        >
                          Edit
                        </Anchor>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Text>No active giveaways.</Text>
          )}

          <Space h='md' />

          <Title order={2} mb='sm'>
            Previous Giveaways
          </Title>
          {giveaways.pastGiveaways.length > 0 ? (
            <Table highlightOnHover withBorder>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Brand</th>
                  <th>Value</th>
                  <th>Entries</th>
                  <th>End Date</th>
                  <th>Winner</th>
                </tr>
              </thead>
              <tbody>
                {giveaways.pastGiveaways.map((giveaway: ISafeGiveaway) => {
                  return (
                    <tr key={giveaway.id}>
                      <td>{giveaway.name}</td>
                      <td>{giveaway.brand}</td>
                      <td>${giveaway.value}</td>
                      <td>
                        {giveaway.entries.length}/{giveaway.maxEntries}
                      </td>
                      <td>{new Date(giveaway.timestampEnd).toLocaleString()}</td>
                      <td>{giveaway.winner}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Text>No previous giveaways.</Text>
          )}

          <Modal
            opened={opened}
            onClose={handleClose}
            centered
            title={`${modalMode === 'create' ? 'Create' : 'Edit'} Giveaway`}
          >
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
              step={0.01}
              min={0.01}
              precision={2}
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

            {modalMode === 'create' && (
              <Dropzone
                onDrop={setImages}
                maxSize={1024 * 1024 * 8}
                accept={[MIME_TYPES.png]}
                maxFiles={1}
                mb='sm'
              >
                <Group
                  position='center'
                  spacing='xl'
                  style={{ minHeight: 120, pointerEvents: 'none' }}
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
            )}

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

            <Button
              onClick={handleSubmitGiveaway}
              disabled={disabled}
              fullWidth
              mb={modalMode === 'edit' ? 'sm' : 0}
            >
              {modalMode === 'create' ? 'Create' : 'Update'} Giveaway
            </Button>
            {modalMode === 'edit' && (
              <Button disabled={disabled} fullWidth color='red' onClick={handleDeleteClick}>
                {confirmDelete ? 'Confirm?' : 'Delete Giveaway'}
              </Button>
            )}
          </Modal>
        </>
      ) : (
        <p>Missing permissions. Redirecting...</p>
      )}
    </Layout>
  );
}

export default Giveaways;
