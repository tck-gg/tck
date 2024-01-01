import { unique } from '@reverse/array';
import { IpData, SimpleUser } from 'types';

import { prisma } from '../client';
import { getUserById } from './user';

export async function getAssociatedIps(userId: string): Promise<string[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      actions: {
        select: {
          ip: true
        }
      }
    }
  });

  if (!user) {
    return [];
  }

  const ips = user.actions.map((ip) => {
    return ip.ip;
  });

  return unique(ips);
}

export async function getAssociatedUsers(ip: string): Promise<SimpleUser[]> {
  const actions = await prisma.userAction.findMany({
    where: { ip }
  });

  const users = actions.map((action) => {
    return action.userId;
  });

  const userIds = unique(users);

  const data = await Promise.all(
    userIds.map(async (userId) => {
      const user = await getUserById(userId);

      let username = 'Unknown';

      if (user) {
        username = user.username;
      }

      return {
        id: userId,
        username
      };
    })
  );

  return data;
}

export async function getAllIps(): Promise<string[]> {
  const actions = await prisma.userAction.findMany({
    select: {
      ip: true
    }
  });

  const ips = actions.map((action) => {
    return action.ip;
  });

  return unique(ips);
}

export async function getIpData(ip: string): Promise<IpData> {
  const users = await getAssociatedUsers(ip);

  return {
    ip,
    users
  };
}

export async function getAllIpData(): Promise<IpData[]> {
  const ips = await getAllIps();

  const data = await Promise.all(
    ips.map((ip) => {
      return getIpData(ip);
    })
  );

  return data;
}
