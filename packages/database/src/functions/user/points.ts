import { Action } from '@prisma/client';

import { prisma } from '../../client';
import { getUserById } from './fetch';

export async function getUserPointsByKickId(kickId: number) {
  const user = await prisma.user.findFirst({
    where: {
      accounts: {
        kick: {
          kickId
        }
      }
    }
  });

  return user?.points || 0;
}

export async function setPoints(userId: string, points: number, ip: string, moderator: string) {
  if (points < 0) {
    points = 0;
  }

  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  const oldPoints = user.points;

  await prisma.user.update({
    where: { id: userId },
    data: {
      points
    }
  });

  // Add user action for target.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      action: Action.USER_POINTS_SET,
      ip,
      timestamp: Date.now(),
      description: `Had points set from ${oldPoints} to ${points} by ${moderator}.`
    }
  });

  // Add user action for moderator.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          username: moderator
        }
      },
      action: Action.USER_POINTS_SET,
      ip,
      timestamp: Date.now(),
      description: `Set points from ${oldPoints} to ${points} for ${user.username}.`
    }
  });

  return true;
}

export async function addPoints(userId: string, points: number, ip: string, moderator: string) {
  if (points < 0) {
    points = 0;
  }

  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  const oldPoints = user.points;

  await prisma.user.update({
    where: { id: userId },
    data: {
      points: {
        increment: points
      }
    }
  });

  // Add user action for target.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      action: Action.USER_POINTS_ADD,
      timestamp: Date.now(),
      description: `Had ${points} added by ${moderator}. ${oldPoints} → ${oldPoints + points}.`
    }
  });

  // Add user action for moderator.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          username: moderator
        }
      },
      action: Action.USER_POINTS_ADD,
      ip,
      timestamp: Date.now(),
      description: `Added ${points} to ${user.username}. ${oldPoints} → ${oldPoints + points}.`
    }
  });

  return true;
}

export async function removePoints(userId: string, points: number, ip: string, moderator: string) {
  if (points < 0) {
    points = 0;
  }

  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  const oldPoints = user.points;

  await prisma.user.update({
    where: { id: userId },
    data: {
      points: {
        decrement: points
      }
    }
  });

  // Add user action for target.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      action: Action.USER_POINTS_REMOVE,
      ip,
      timestamp: Date.now(),
      description: `Had ${points} removed by ${user.username}. ${oldPoints} → ${
        oldPoints - points
      }.`
    }
  });

  // Add user action for moderator.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          username: moderator
        }
      },
      action: Action.USER_POINTS_REMOVE,
      ip,
      timestamp: Date.now(),
      description: `Removed ${points} from ${user.username}. ${oldPoints} → ${oldPoints - points}.`
    }
  });

  return true;
}
