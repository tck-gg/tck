/* eslint-disable react-hooks/exhaustive-deps */

import {
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  Code,
  Group,
  Input,
  Menu,
  Modal,
  NumberInput,
  Pagination,
  Paper,
  ScrollArea,
  SegmentedControl,
  Space,
  Table,
  Text,
  Title,
  TransferList,
  TransferListData
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Permission, Prisma, User, UserAccounts, UserAction, getAllUsers } from 'database';
import dateformat from 'dateformat';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {
  IconDots,
  IconLicense,
  IconLock,
  IconLockOpen,
  IconPencil,
  IconSearch,
  IconSend,
  IconTrash,
  IconX,
  IconCheck
} from '@tabler/icons-react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { notifications } from '@mantine/notifications';

import { usePermissions } from '@/hooks/permissions';

import Layout from '@/components/Layout';
import AccountActivity from '@/components/users/AccountActivity';

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

export async function getServerSideProps() {
  const users = await getAllUsers();

  return {
    props: {
      users: users.map((user) => {
        return {
          ...user,
          apiKey: null,
          password: null
        };
      })
    }
  };
}

type IUserAccounts = Prisma.UserAccountsGetPayload<{
  include: {
    kick: true;
  };
}>;

type IUser = Omit<
  User,
  keyof {
    apiKey: string;
    password: string;
  }
> & {
  accounts: IUserAccounts | null;
  actions: UserAction[];
};

function filterBySearch(users: IUser[], search: string) {
  return users.filter((user) => {
    return (
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.includes(search) ||
      user.displayName.toLowerCase().includes(search.toLowerCase()) ||
      user.id.includes(search) ||
      user.accounts?.discord?.includes(search) ||
      user.accounts?.kick?.kickUsername.includes(search) ||
      user.accounts?.twitch?.includes(search)
    );
  });
}

function showErrorNotification(status: number) {
  if (status === 401) {
    notifications.show({
      title: 'Unauthorized',
      message: 'You are not authorized to perform this action.',
      color: 'red',
      icon: <IconX />,
      withBorder: true,
      autoClose: 10000
    });
    return;
  }
  if (status === 403) {
    notifications.show({
      title: 'Forbidden',
      message: 'You are not allowed to perform this action.',
      color: 'red',
      icon: <IconX />,
      withBorder: true,
      autoClose: 10000
    });
    return;
  }
  if (status === 418) {
    notifications.show({
      title: 'Forbidden',
      message: 'You are not allowed to modify yourself.',
      color: 'red',
      icon: <IconX />,
      withBorder: true,
      autoClose: 10000
    });
    return;
  }
  if (status === 500) {
    notifications.show({
      title: 'Internal Server Error',
      message: 'An internal server error occurred.',
      color: 'red',
      icon: <IconX />,
      withBorder: true,
      autoClose: 10000
    });
  }
}

function Users({ users }: { users: IUser[] }) {
  const permissions = usePermissions();
  const router = useRouter();

  const [cookie, setCookie] = useCookies(['authorization']);

  const top = useRef<HTMLDivElement>(null);

  const [tab, setTab] = useState('verified');
  const [banTab, setBanTab] = useState('unbanned');
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [counts, setCounts] = useState<{
    verified: number;
    unverified: number;
    mod: number;
    banned: number;
    unbanned: number;
  }>({
    verified: 0,
    unverified: 0,
    mod: 0,
    banned: 0,
    unbanned: 0
  });
  const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const [disabled, setDisabled] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isActivityModalOpen, { open: openActivityModal, close: closeActivityModal }] =
    useDisclosure(false);

  const [permissionsListData, setPermissionsListData] = useState<TransferListData>([[], []]);
  const [isPermissionsModalOpen, { open: openPermissionsModal, close: closePermissionsModal }] =
    useDisclosure(false);

  const [banUnbanMode, setBanUnbanMode] = useState<'ban' | 'unban'>('ban');
  const [isBanUnbanModalOpen, { open: openBanUnbanModal, close: closeBanUnbanModal }] =
    useDisclosure(false);

  const [isDeleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const [points, setPoints] = useState<number>(0);
  const [isPointsModalOpen, { open: openPointsModal, close: closePointsModal }] =
    useDisclosure(false);

  useEffect(() => {
    setTimeout(() => {
      if (!permissions.permissions.includes('MANAGE_USERS')) {
        router.push('/');
      }
    }, 3000);
  }, []);

  useEffect(() => {
    // Update display table.
    setFilteredUsers(
      filterBySearch(
        users
          .filter((user) => {
            return !user.isDeleted;
          })
          .filter((user) => {
            if (tab === 'verified') {
              return user.isVerified;
            }
            if (tab === 'unverified') {
              return !user.isVerified;
            }
            if (tab === 'mod') {
              return user.permissions.includes('ACCESS_ADMIN_PANEL');
            }
            return false;
          })
          .filter((user) => {
            if (banTab === 'unbanned') {
              return !user.isBanned;
            }
            if (banTab === 'banned') {
              return user.isBanned;
            }
            return false;
          }),
        search
      )
    );

    // Update counts.
    setCounts({
      verified: filterBySearch(users, search)
        .filter((user) => {
          return !user.isDeleted;
        })
        .filter((user) => {
          return user.isVerified;
        }).length,
      unverified: filterBySearch(users, search)
        .filter((user) => {
          return !user.isDeleted;
        })
        .filter((user) => {
          return !user.isVerified;
        }).length,
      mod: filterBySearch(users, search)
        .filter((user) => {
          return !user.isDeleted;
        })
        .filter((user) => {
          return user.permissions.includes('ACCESS_ADMIN_PANEL');
        }).length,
      banned: filterBySearch(users, search)
        .filter((user) => {
          return !user.isDeleted;
        })
        .filter((user) => {
          return !user.isDeleted;
        })
        .filter((user) => {
          if (tab === 'verified') {
            return user.isVerified;
          }
          if (tab === 'unverified') {
            return !user.isVerified;
          }
          if (tab === 'mod') {
            return user.permissions.includes('ACCESS_ADMIN_PANEL');
          }
          return false;
        })
        .filter((user) => {
          return user.isBanned;
        }).length,
      unbanned: filterBySearch(users, search)
        .filter((user) => {
          return !user.isDeleted;
        })
        .filter((user) => {
          if (tab === 'verified') {
            return user.isVerified;
          }
          if (tab === 'unverified') {
            return !user.isVerified;
          }
          if (tab === 'mod') {
            return user.permissions.includes('ACCESS_ADMIN_PANEL');
          }
          return false;
        })
        .filter((user) => {
          return !user.isBanned;
        }).length
    });
  }, [users, tab, search, banTab]);

  useEffect(() => {
    setPages(Math.ceil(filteredUsers.length / 30));
  }, [filteredUsers]);

  useEffect(() => {
    setPage(1);
  }, [tab, banTab, search]);

  useEffect(() => {
    (async () => {
      const fetchedPermissions = await axios.get(`${getUrl()}/api/v1/permissions`);
      const allPermissions: Permission[] = fetchedPermissions.data;

      if (selectedUser) {
        setPermissionsListData([
          allPermissions
            .filter((permission) => {
              return !selectedUser.permissions.includes(permission);
            })
            .map((permission) => {
              return {
                value: permission,
                label: permission
              };
            }),
          selectedUser.permissions.map((permission) => {
            return {
              value: permission,
              label: permission
            };
          })
        ]);
      }
    })();
  }, [selectedUser, isPermissionsModalOpen]);

  async function updatePermissions() {
    setDisabled(true);

    const newPermissions = permissionsListData[1].map((permission) => {
      return permission.value;
    });

    const response = await axios.post(
      `${getUrl()}/api/v1/user/update-permissions`,
      {
        permissions: newPermissions,
        userId: selectedUser?.id
      },
      {
        headers: {
          authorization: cookie.authorization
        },
        validateStatus: () => {
          return true;
        }
      }
    );

    if (response.status === 200) {
      closePermissionsModal();

      notifications.show({
        title: 'Permissions Updated',
        message: `Permissions for ${selectedUser?.username} have been updated.`,
        color: 'teal',
        icon: <IconCheck />,
        withBorder: true,
        autoClose: 10000
      });

      setDisabled(false);
      router.replace(router.asPath);

      return;
    }

    showErrorNotification(response.status);
    setDisabled(false);
  }

  async function promptBanUnban(action: 'ban' | 'unban', user: IUser) {
    setSelectedUser(user);
    setBanUnbanMode(action);
    openBanUnbanModal();
  }

  async function banUnban() {
    setDisabled(true);

    const response = await axios.post(
      `${getUrl()}/api/v1/user/${banUnbanMode}`,
      {
        userId: selectedUser?.id
      },
      {
        headers: {
          authorization: cookie.authorization
        },
        validateStatus: () => {
          return true;
        }
      }
    );

    if (response.status === 200) {
      closeBanUnbanModal();

      notifications.show({
        title: 'Success',
        message: `${selectedUser?.username || 'Unknown'} has been ${
          banUnbanMode === 'unban' ? 'un' : ''
        }banned.`,
        color: 'teal',
        icon: <IconCheck />,
        withBorder: true,
        autoClose: 10000
      });

      setDisabled(false);
      router.replace(router.asPath);

      return;
    }

    showErrorNotification(response.status);
    setDisabled(false);
  }

  async function deleteUser() {
    setDisabled(true);

    const response = await axios.post(
      `${getUrl()}/api/v1/user/delete`,
      {
        userId: selectedUser?.id
      },
      {
        headers: {
          authorization: cookie.authorization
        },
        validateStatus: () => {
          return true;
        }
      }
    );

    if (response.status === 200) {
      closeDeleteModal();
      setDisabled(false);
      router.replace(router.asPath);

      notifications.show({
        title: 'Success',
        message: `${selectedUser?.username || 'Unknown'} has been deleted.`,
        color: 'teal',
        icon: <IconCheck />,
        withBorder: true,
        autoClose: 10000
      });

      return;
    }

    showErrorNotification(response.status);
    setDisabled(false);
  }

  async function updatePoints() {
    setDisabled(true);

    const response = await axios.post(
      `${getUrl()}/api/v1/user/points/set`,
      {
        userId: selectedUser?.id,
        points
      },
      {
        headers: {
          authorization: cookie.authorization
        },
        validateStatus: () => {
          return true;
        }
      }
    );

    if (response.status === 200) {
      closePointsModal();
      setDisabled(false);
      router.replace(router.asPath);

      notifications.show({
        title: 'Success',
        message: `Points for ${selectedUser?.username || 'Unknown'} have been updated.`,
        color: 'teal',
        icon: <IconCheck />,
        withBorder: true,
        autoClose: 10000
      });
    }

    showErrorNotification(response.status);
    setDisabled(false);
  }

  return (
    <Layout>
      {permissions.permissions.includes('MANAGE_USERS') ? (
        <>
          <Title mb='sm' ref={top}>
            Users
          </Title>

          <SegmentedControl
            value={tab}
            onChange={setTab}
            data={[
              {
                label: `Verified Users (${counts.verified})`,
                value: 'verified'
              },
              {
                label: `Unverified Users (${counts.unverified})
              `,
                value: 'unverified'
              },
              {
                label: `Moderator (${counts.mod})
              `,
                value: 'mod'
              }
            ]}
            mb='sm'
          />

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

          <Paper shadow='xs' p='md'>
            <SegmentedControl
              value={banTab}
              onChange={setBanTab}
              data={[
                {
                  label: `Unbanned Users (${counts.unbanned})`,
                  value: 'unbanned'
                },
                {
                  label: `Banned Users (${counts.banned})`,
                  value: 'banned'
                }
              ]}
              mb='sm'
              variant='outline'
            />

            {filteredUsers.length > 0 ? (
              <ScrollArea>
                <Table highlightOnHover withBorder>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Points</th>
                      <th>Joined</th>
                      <th>Last Active</th>
                      {permissions.permissions.includes('USER_VIEW_ACTIVITY') && <th>Activity</th>}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers
                      .map((user) => {
                        return (
                          <tr key={user.id}>
                            <td>
                              <Group spacing='sm'>
                                <Avatar size={40} radius='xl'>
                                  {(user.displayName || user.username)
                                    .split(' ')
                                    .splice(0, 2)
                                    .map((name: string) => {
                                      return name.split('')[0];
                                    })
                                    .join('')}
                                </Avatar>
                                <div>
                                  <Text fz='sm' fw={500}>
                                    {user.username}
                                  </Text>
                                  <Text fz='xs' c='dimmed'>
                                    {`"${user.displayName}"`}
                                  </Text>
                                </div>
                              </Group>
                            </td>
                            <td>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                {user.email}
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
                                      icon={<IconSend size='1rem' stroke={1.5} />}
                                      onClick={() => {
                                        window.open(`mailto:${user.email}`);
                                      }}
                                    >
                                      Send Email
                                    </Menu.Item>
                                    <Menu.Item
                                      icon={<IconSearch size='1rem' stroke={1.5} />}
                                      onClick={() => {
                                        window.open(`https://verifymail.io/email/${user.email}`);
                                      }}
                                    >
                                      Lookup
                                    </Menu.Item>
                                  </Menu.Dropdown>
                                </Menu>
                              </div>
                            </td>
                            <td>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                {user.points}
                                {permissions.permissions.includes('USER_POINTS_SET') && (
                                  <Menu
                                    transitionProps={{ transition: 'pop' }}
                                    withArrow
                                    position='bottom-end'
                                    withinPortal
                                  >
                                    <Menu.Target>
                                      <ActionIcon
                                        onClick={() => {
                                          setSelectedUser(user);
                                          setPoints(user.points);
                                          openPointsModal();
                                        }}
                                      >
                                        <IconPencil size='1rem' stroke={1.5} />
                                      </ActionIcon>
                                    </Menu.Target>
                                  </Menu>
                                )}
                              </div>
                            </td>
                            <td>
                              {dateformat(
                                user.actions.find((action) => {
                                  return action.action === 'ACCOUNT_CREATE';
                                })?.timestamp,
                                'yyyy-mm-dd, HH:MM:ss'
                              )}
                            </td>
                            <td>
                              {dateformat(
                                user.actions
                                  .filter((action) => {
                                    return action.action === 'ACCOUNT_LOGIN';
                                  })
                                  .sort((a, b) => {
                                    return b.timestamp - a.timestamp;
                                  })[0]?.timestamp,
                                'yyyy-mm-dd, HH:MM:ss'
                              )}
                            </td>
                            {permissions.permissions.includes('USER_VIEW_ACTIVITY') && (
                              <td>
                                <Anchor
                                  component='button'
                                  onClick={() => {
                                    setSelectedUser(user);
                                    openActivityModal();
                                  }}
                                >
                                  View activity
                                </Anchor>
                              </td>
                            )}
                            <td>
                              <Group spacing={0} position='left'>
                                <ActionIcon>
                                  <IconPencil size='1rem' stroke={1.5} />
                                </ActionIcon>
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
                                    {permissions.permissions.includes(
                                      'USER_MODIFY_PERMISSIONS'
                                    ) && (
                                      <Menu.Item
                                        icon={<IconLicense size='1rem' stroke={1.5} />}
                                        onClick={() => {
                                          openPermissionsModal();
                                          setSelectedUser(user);
                                        }}
                                      >
                                        Change Permissions
                                      </Menu.Item>
                                    )}
                                    {user.isBanned
                                      ? permissions.permissions.includes('USER_UNBAN') && (
                                          <Menu.Item
                                            icon={<IconLockOpen size='1rem' stroke={1.5} />}
                                            onClick={() => {
                                              promptBanUnban('unban', user);
                                            }}
                                          >
                                            Unban
                                          </Menu.Item>
                                        )
                                      : permissions.permissions.includes('USER_BAN') && (
                                          <Menu.Item
                                            icon={<IconLock size='1rem' stroke={1.5} />}
                                            onClick={() => {
                                              promptBanUnban('ban', user);
                                            }}
                                          >
                                            Ban
                                          </Menu.Item>
                                        )}
                                    <Menu.Item
                                      icon={<IconTrash size='1rem' stroke={1.5} />}
                                      onClick={() => {
                                        setSelectedUser(user);
                                        openDeleteModal();
                                      }}
                                    >
                                      Delete
                                    </Menu.Item>
                                  </Menu.Dropdown>
                                </Menu>
                              </Group>
                            </td>
                          </tr>
                        );
                      })
                      .splice((page - 1) * 30, 30)}
                  </tbody>
                </Table>

                <Pagination
                  total={pages}
                  value={page}
                  onChange={(newPage) => {
                    setPage(newPage);
                    top.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                  mt='md'
                />
              </ScrollArea>
            ) : (
              <Text>No users found.</Text>
            )}
          </Paper>

          <Modal
            opened={isActivityModalOpen}
            onClose={closeActivityModal}
            title={`Account Activity for ${selectedUser?.username || 'Unknown'}`}
            centered
            size='auto'
          >
            <AccountActivity username={selectedUser?.username || 'Unknown'} />
          </Modal>

          <Modal
            opened={isPermissionsModalOpen}
            onClose={closePermissionsModal}
            title={`Permissions for ${selectedUser?.username || 'Unknown'}`}
            centered
            size='auto'
          >
            <TransferList
              value={permissionsListData}
              onChange={setPermissionsListData}
              searchPlaceholder='Search...'
              nothingFound='No results...'
              titles={['Available Permissions', 'Granted Permissions']}
              breakpoint='sm'
              listHeight={500}
            />
            <Group position='right' mt='sm' grow>
              <Button onClick={closePermissionsModal} variant='outline'>
                Discard
              </Button>
              <Button onClick={updatePermissions} disabled={disabled}>
                Save
              </Button>
            </Group>
          </Modal>

          <Modal
            opened={isBanUnbanModalOpen}
            onClose={closeBanUnbanModal}
            title={`${banUnbanMode === 'ban' ? 'B' : 'Unb'}an User: ${
              selectedUser?.username || 'Unknown'
            }`}
            centered
          >
            <Text>
              Are you sure you want to {banUnbanMode === 'ban' ? 'b' : 'unb'}an{' '}
              <strong>{selectedUser?.username || 'Unknown'}</strong>?
            </Text>
            <Space h='sm' />
            <Text color='dimmed' size='xs'>
              You can undo this action as long as you have the{' '}
              <Code>USER_{banUnbanMode === 'ban' && 'UN'}BAN</Code> permission.
            </Text>
            <Group position='right' mt='md' grow>
              <Button onClick={closeBanUnbanModal} variant='outline'>
                Cancel
              </Button>
              <Button onClick={banUnban} color='red' disabled={disabled}>
                {banUnbanMode === 'ban' ? 'B' : 'Unb'}an
              </Button>
            </Group>
          </Modal>

          <Modal
            opened={isDeleteModalOpen}
            onClose={closeDeleteModal}
            title={`Delete User: ${selectedUser?.username || 'Unknown'}`}
            centered
          >
            <Text>
              Are you sure you want to delete the user{' '}
              <strong>{selectedUser?.username || 'Unknown'}</strong>?
            </Text>
            <Space h='sm' />
            <Text color='dimmed' size='xs'>
              This action is <strong>irreversible</strong>.
            </Text>
            <Group position='right' mt='md' grow>
              <Button onClick={closeBanUnbanModal} variant='outline'>
                Cancel
              </Button>
              <Button onClick={deleteUser} color='red' disabled={disabled}>
                Delete
              </Button>
            </Group>
          </Modal>

          <Modal
            opened={isPointsModalOpen}
            onClose={closePointsModal}
            title={`Edit Points for ${selectedUser?.username || 'Unknown'}`}
            centered
          >
            <NumberInput
              label='Points'
              placeholder='Points'
              value={points}
              type='number'
              onChange={(value) => {
                setPoints(value || 0);
              }}
            />
            <Group position='right' mt='md' grow>
              <Button onClick={closePointsModal} variant='outline'>
                Cancel
              </Button>
              <Button onClick={updatePoints} disabled={disabled}>
                Update
              </Button>
            </Group>
          </Modal>
        </>
      ) : (
        <p>Missing permissions. Redirecting...</p>
      )}
    </Layout>
  );
}

export default Users;
