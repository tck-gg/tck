import { v4 } from 'uuid';

import { prisma } from '../client';

export async function hasKickVerification(kickUsername: string) {
  const kickVerification = await prisma.kickVerification.findFirst({
    where: {
      kickUsername
    }
  });

  return kickVerification !== null;
}

export async function requestKickVerification(
  userId: string,
  kickUsername: string
): Promise<string> {
  const verificationCode = v4().substring(0, 8);

  await prisma.kickVerification.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      kickUsername,
      verificationCode,
      timestamp: Date.now()
    }
  });

  return verificationCode;
}

export async function validateKickVerification(
  kickUsername: string,
  verificationCode: string
): Promise<boolean> {
  const kickVerification = await prisma.kickVerification.findFirst({
    where: {
      verificationCode
    }
  });

  if (!kickVerification) {
    return false;
  }

  const { kickUsername: verificationKickUsername } = kickVerification;

  // If the user doesn't match the verification code's user.
  if (verificationKickUsername !== kickUsername) {
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
          kick: kickUsername
        }
      }
    }
  });

  return true;
}
