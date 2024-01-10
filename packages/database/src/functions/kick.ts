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
