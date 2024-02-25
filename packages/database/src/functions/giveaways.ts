import { ObjectId } from 'mongodb';
import RandomOrg from 'random-org';

import { Action, User, prisma } from '../client';
import { socket } from '../socket';
import { deleteImage } from './backblaze';
import { ISafeGiveaway } from 'types';

export async function getAllGiveaways(): Promise<{
  currentGiveaways: ISafeGiveaway[];
  pastGiveaways: ISafeGiveaway[];
}> {
  const currentGiveaways = await prisma.giveaway.findMany({
    where: {
      timestampEnd: {
        gt: Date.now()
      }
    },
    include: {
      entries: {
        include: {
          user: true
        }
      },
      winner: true
    },
    orderBy: {
      timestampEnd: 'asc'
    }
  });
  const pastGiveaways = await prisma.giveaway.findMany({
    where: {
      timestampEnd: {
        lt: Date.now()
      }
    },
    include: {
      entries: {
        include: {
          user: true
        }
      },
      winner: true
    },
    orderBy: {
      timestampEnd: 'desc'
    }
  });

  return {
    currentGiveaways: currentGiveaways.map((currentGiveaway) => {
      return {
        ...currentGiveaway,
        entries: currentGiveaway.entries.map((entry) => {
          return {
            id: entry.id,
            username: entry.user.username,
            slot: entry.slot
          };
        }),
        winner: currentGiveaway.winner?.username || null
      };
    }),
    pastGiveaways: pastGiveaways.map((pastGiveaway) => {
      return {
        ...pastGiveaway,
        entries: pastGiveaway.entries.map((entry) => {
          return {
            id: entry.id,
            username: entry.user.username,
            slot: entry.slot
          };
        }),
        winner: pastGiveaway.winner?.username || null
      };
    })
  };
}

export async function updateGiveaway(
  id: string,
  name: string,
  brand: string,
  value: number,
  maxEntries: number,
  timestampEnd: number,
  userId: string,
  ip: string
): Promise<boolean> {
  const giveaway = await prisma.giveaway.findUnique({
    where: {
      id
    }
  });
  if (!giveaway) {
    return false;
  }

  await prisma.giveaway.update({
    where: {
      id
    },
    data: {
      name,
      brand,
      value,
      maxEntries,
      timestampEnd
    }
  });

  if (
    name === giveaway.name &&
    brand === giveaway.brand &&
    value === giveaway.value &&
    maxEntries === giveaway.maxEntries &&
    timestampEnd === giveaway.timestampEnd
  ) {
    return true;
  }

  // Get updates.
  const updates = [];
  if (giveaway.name !== name) {
    updates.push(`Name updated from ${giveaway.name} to ${name}.`);
  }
  if (giveaway.brand !== brand) {
    updates.push(`Brand updated from ${giveaway.brand} to ${brand}.`);
  }
  if (giveaway.value !== value) {
    updates.push(`Value updated from ${giveaway.value} to ${value}.`);
  }
  if (giveaway.maxEntries !== maxEntries) {
    updates.push(`Max entries updated from ${giveaway.maxEntries} to ${maxEntries}.`);
  }
  if (giveaway.timestampEnd !== timestampEnd) {
    updates.push(`End date updated from ${giveaway.timestampEnd} to ${timestampEnd}.`);
  }

  // Create action.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      action: Action.GIVEAWAY_UPDATE,
      ip,
      timestamp: Date.now(),
      description: `Giveaway ${id} updated. ${updates.join(' ')}`
    }
  });

  return true;
}

export async function deleteGiveaway(id: string, userId: string, ip: string): Promise<boolean> {
  const giveaway = await prisma.giveaway.findUnique({
    where: {
      id
    }
  });
  if (!giveaway) {
    return false;
  }

  // Delete the image.
  const success = await deleteImage(giveaway.image, 'giveaways');
  if (!success) {
    return false;
  }

  // Send Discord notification.
  socket.emit('deleteGiveaway', giveaway);

  // Delete all entries.
  await prisma.giveawayEntry.deleteMany({
    where: {
      giveawayId: id
    }
  });

  // Delete the database entry.
  await prisma.giveaway.delete({
    where: {
      id
    }
  });

  // Create action.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      action: Action.GIVEAWAY_DELETE,
      ip,
      timestamp: Date.now(),
      description: `Giveaway ${id}`
    }
  });

  return true;
}

export async function getGiveaway(id: string): Promise<ISafeGiveaway | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const giveaway = await prisma.giveaway.findUnique({
    where: {
      id
    },
    include: {
      entries: {
        include: {
          user: true
        }
      },
      winner: true
    }
  });

  if (!giveaway) {
    return null;
  }

  const safeGiveaway = {
    ...giveaway,
    entries: giveaway.entries.map((entry) => {
      return {
        id: entry.id,
        username: entry.user.username,
        slot: entry.slot
      };
    }),
    winner: giveaway.winner?.username || null
  };

  return safeGiveaway;
}

export async function endGiveaway(id: string) {
  const giveaway = await getGiveaway(id);
  if (!giveaway) {
    return;
  }

  // Didn't have enough entries. Extend by one day.
  if (giveaway.entries.length === 0) {
    const newTimestampEnd = giveaway.timestampEnd + 86400000;

    await prisma.giveaway.update({
      where: {
        id: giveaway.id
      },
      data: {
        timestampEnd: newTimestampEnd
      }
    });

    setTimeout(async () => {
      await endGiveaway(giveaway.id);
    }, 86400000);

    return;
  }

  let winnerIndex = 0;
  const entries = giveaway.entries.length;
  if (process.env.RANDOM_ORG_API_KEY) {
    const randomOrg = new RandomOrg({ apiKey: process.env.RANDOM_ORG_API_KEY });

    if (entries !== 1) {
      const response = await randomOrg.generateSignedIntegers({
        min: 0,
        max: entries - 1,
        n: 1
      });
      winnerIndex = response.random.data[0];
    }
  } else {
    winnerIndex = Math.floor(Math.random() * entries);
  }
  const winner = giveaway.entries[winnerIndex];

  // Update database.
  await prisma.giveaway.update({
    where: {
      id
    },
    data: {
      winner: {
        connect: {
          username: winner.username
        }
      }
    }
  });
}

export async function createGiveaway(
  name: string,
  brand: string,
  value: number,
  maxEntries: number,
  timestampEnd: number,
  image: string,
  userId: string,
  ip: string
) {
  const giveaway = await prisma.giveaway.create({
    data: {
      name,
      brand,
      value,
      maxEntries,
      timestampCreation: Date.now(),
      timestampEnd,
      image
    }
  });

  // Create action.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      action: Action.GIVEAWAY_CREATE,
      ip,
      timestamp: Date.now(),
      description: `Giveaway ${giveaway.id}`
    }
  });

  // Send Discord notification.
  socket.emit('newGiveaway', giveaway);

  const timeout = timestampEnd - Date.now();
  setTimeout(async () => {
    await endGiveaway(giveaway.id);
  }, timeout);
}

export async function enterGiveaway(user: User, giveawayId: string, ip: string): Promise<boolean> {
  const giveaway = await getGiveaway(giveawayId);

  if (!giveaway) {
    // If the giveaway doesn't exist.
    return false;
  }

  if (giveaway.winner || Date.now() > giveaway.timestampEnd) {
    // If the giveaway has already ended.
    return false;
  }

  if (
    giveaway.entries
      .map((user) => {
        return user.username;
      })
      .includes(user.username)
  ) {
    // The user was already entered.
    return false;
  }

  if (giveaway.entries.length >= giveaway.maxEntries) {
    // The giveaway is full.
    return false;
  }

  await prisma.giveaway.update({
    where: {
      id: giveawayId
    },
    data: {
      entries: {
        create: {
          slot: giveaway.entries.length,
          timestamp: Date.now(),
          userId: user.id
        }
      }
    }
  });

  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: user.id
        }
      },
      action: Action.GIVEAWAY_JOIN,
      ip,
      timestamp: Date.now(),
      description: `Giveaway ${giveawayId}`
    }
  });

  return true;
}
