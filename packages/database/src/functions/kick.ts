import { v4 } from 'uuid';
import { Action } from '@prisma/client';

import { prisma } from '../client';

export async function hasKickVerification(userId: string) {
  const kickVerification = await prisma.kickVerification.findFirst({
    where: {
      userId
    }
  });

  return kickVerification !== null;
}

export async function kickVerificationCodeExists(verificationCode: string) {
  const kickVerification = await prisma.kickVerification.findFirst({
    where: {
      verificationCode
    }
  });

  return kickVerification !== null;
}

export async function requestKickVerification(userId: string): Promise<string> {
  let verificationCode;
  do {
    verificationCode = v4().substring(0, 8);
  } while (await kickVerificationCodeExists(verificationCode));

  await prisma.kickVerification.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      verificationCode,
      timestamp: Date.now()
    }
  });

  return verificationCode;
}

export async function validateKickVerification(
  kickUsername: string,
  kickId: number,
  verificationCode: string,
  ip: string
): Promise<boolean> {
  const kickVerification = await prisma.kickVerification.findFirst({
    where: {
      verificationCode
    }
  });
  if (!kickVerification || !kickId) {
    return false;
  }

  const cleanKickUsername = kickUsername.trim();
  if (!cleanKickUsername) {
    return false;
  }

  const existingUser = await prisma.userAccounts.findFirst({
    where: {
      kick: {
        kickUsername: cleanKickUsername
      }
    }
  });

  if (existingUser) {
    return false;
  }

  // Delete the verification code.
  await prisma.kickVerification.delete({
    where: {
      userId: kickVerification.userId
    }
  });

  // Add Kick username to profile.
  await prisma.user.update({
    where: {
      id: kickVerification.userId
    },
    data: {
      accounts: {
        update: {
          kick: {
            update: {
              kickUsername: cleanKickUsername,
              kickId
            }
          }
        }
      }
    }
  });

  // Create log.
  await prisma.userAction.create({
    data: {
      user: {
        connect: {
          id: kickVerification.userId
        }
      },
      action: Action.LINK_KICK,
      ip,
      timestamp: Date.now(),
      description: `Linked Kick account "${cleanKickUsername}".`
    }
  });

  return true;
}
