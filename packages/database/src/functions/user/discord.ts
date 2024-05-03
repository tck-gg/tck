import axios from 'axios';

import { prisma } from '../../client';

export async function verifyDiscord(accessToken: string, userId: string): Promise<boolean> {
  const response = await axios.get('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status !== 200) {
    return false;
  }

  const data = response.data;

  const discordId = data.id;
  const discordUsername = data.username;
  const discordAvatar = data.avatar;

  // TODO: Database work.
  const user = await prisma.user.findFirst({
    where: {
      id: userId
    }
  });
  if (!user) {
    return false;
  }

  // Existing Discord account.
  const existingDiscord = await prisma.discordAccount.findFirst({
    where: {
      discordId
    }
  });
  if (existingDiscord) {
    return false;
  }

  await prisma.userAccounts.update({
    where: {
      userId: user.id
    },
    data: {
      discord: {
        create: {
          discordId,
          discordUsername,
          discordAvatar
        }
      }
    }
  });

  return true;
}
