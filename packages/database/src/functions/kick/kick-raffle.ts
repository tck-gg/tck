import { prisma } from '../../client';

export async function createKickRaffle(
  duration: number,
  reward: number,
  creator: string
): Promise<string | null> {
  if (duration < 1 || reward < 1) {
    return null;
  }

  const authorizedUser = await prisma.user.findFirst({
    where: {
      accounts: {
        kick: {
          kickUsername: creator
        }
      }
    }
  });
  if (!authorizedUser) {
    return null;
  }
  if (!authorizedUser.permissions.includes('CREATE_KICK_RAFFLE')) {
    return null;
  }

  // Create raffle.
  const created = await prisma.kickRaffle.create({
    data: {
      duration,
      reward,
      timestamp: Date.now(),
      entries: []
    }
  });

  // Create action.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: authorizedUser.id
        }
      },
      action: 'CREATE_KICK_RAFFLE',
      ip: 'kick.com',
      timestamp: Date.now(),
      description: `Started a ${duration} second ${reward} point raffle on Kick.`
    }
  });

  return created.id;
}

export async function enterKickRaffle(
  raffleId: string,
  kickUsername: string
): Promise<'error' | 'unlinked' | 'exists' | 'entered'> {
  const user = await prisma.user.findFirst({
    where: {
      accounts: {
        kick: {
          kickUsername
        }
      }
    },
    include: {
      accounts: {
        include: {
          kick: true
        }
      }
    }
  });
  if (!user) {
    return 'error';
  }

  if (!user.accounts?.kick?.kickUsername) {
    return 'unlinked';
  }

  const raffle = await prisma.kickRaffle.findFirst({
    where: {
      id: raffleId
    }
  });
  if (!raffle) {
    return 'error';
  }

  // Check if we entered already.
  if (raffle.entries.includes(kickUsername)) {
    return 'exists';
  }

  // Add entry.
  await prisma.kickRaffle.update({
    where: {
      id: raffleId
    },
    data: {
      entries: {
        push: kickUsername
      }
    }
  });

  return 'entered';
}

export async function endKickRaffle(id: string): Promise<{
  entries: number;
  points: number;
}> {
  const raffle = await prisma.kickRaffle.findFirst({
    where: {
      id
    }
  });
  if (!raffle) {
    return {
      entries: -1,
      points: 0
    };
  }

  if (raffle.entries.length === 0) {
    return {
      entries: 0,
      points: raffle.reward
    };
  }

  // Give points.
  await prisma.user.updateMany({
    where: {
      accounts: {
        kick: {
          kickUsername: {
            in: raffle.entries
          }
        }
      }
    },
    data: {
      points: {
        increment: raffle.reward
      }
    }
  });

  return {
    entries: raffle.entries.length,
    points: raffle.reward
  };
}
