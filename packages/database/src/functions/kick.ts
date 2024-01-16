import { v4 } from 'uuid';

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

  const cleanKickUsername = kickUsername.trim();
  if (!cleanKickUsername) {
    return false;
  }

  const existingUser = await prisma.userAccounts.findFirst({
    where: {
      kick: cleanKickUsername
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
          kick: cleanKickUsername
        }
      }
    }
  });

  return true;
}
