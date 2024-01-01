import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ActionIcon, Input, Menu, Modal, Paper, Table, Title } from '@mantine/core';
import { getAllIpData } from 'database';
import { IpData } from 'types';
import { IconDots, IconLock, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

import Layout from '@/components/Layout';

import { usePermissions } from '@/hooks/permissions';

export async function getServerSideProps() {
  const ipData = await getAllIpData();

  ipData.sort((a, b) => {
    return b.users.length - a.users.length;
  });

  return {
    props: {
      ipData
    }
  };
}

function Raffles({ ipData }: { ipData: IpData[] }) {
  const router = useRouter();
  const permissions = usePermissions();

  const [search, setSearch] = useState('');
  const [selectedIp, setSelectedIp] = useState<null | string>(null);
  const [isIpModalOpen, { open: openIpModal, close: closeIpModal }] = useDisclosure(false);

  useEffect(() => {
    setTimeout(() => {
      if (!permissions.permissions.includes('MANAGE_IPS')) {
        router.push('/');
      }
    }, 3000);
  });

  return (
    <Layout>
      {permissions.permissions.includes('MANAGE_IPS') ? (
        <>
          <Title mb='sm'>IPs</Title>

          <Paper shadow='xs' p='md' mb='sm'>
            <Input
              placeholder='Search...'
              icon={<IconSearch size='1rem' stroke={1.5} />}
              size='sm'
              value={search}
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
            />
          </Paper>

          <Table>
            <thead>
              <tr>
                <th>IP</th>
                <th>Users</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ipData.map((ip) => {
                return (
                  <tr key={ip.ip}>
                    <td>{ip.ip}</td>
                    <td>{ip.users.length}</td>
                    <td>
                      <Menu
                        transitionProps={{ transition: 'pop' }}
                        withArrow
                        position='bottom-end'
                        withinPortal
                      >
                        <Menu.Target>
                          <ActionIcon>
                            <IconDots size='1rem' stroke={1.5} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            icon={<IconSearch size='1rem' stroke={1.5} />}
                            onClick={() => {
                              setSelectedIp(ip.ip);
                              openIpModal();
                            }}
                          >
                            View Users
                          </Menu.Item>
                          <Menu.Item icon={<IconLock size='1rem' stroke={1.5} />}>
                            Ban All Accounts
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Modal
            opened={isIpModalOpen}
            onClose={closeIpModal}
            title={`Users Associated with ${selectedIp}`}
            centered
            size='auto'
          >
            <Table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {ipData
                  .find((ip) => {
                    return ip.ip === selectedIp;
                  })
                  ?.users.sort((a, b) => {
                    return a.username.localeCompare(b.username);
                  })
                  .map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.id}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Modal>
        </>
      ) : (
        <p>Missing permissions. Redirecting...</p>
      )}
    </Layout>
  );
}

export default Raffles;
