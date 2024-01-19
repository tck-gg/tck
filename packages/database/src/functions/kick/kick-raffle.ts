import { prisma } from '../../client';

export async function createKickRaffle(duration: number, reward: number): Promise<boolean> {
  if (duration < 1 || reward < 1) {
    return false;
  }

  await prisma.kickRaffle.create({
    data: {
      duration,
      reward,
      timestamp: Date.now(),
      entries: []
    }
  });

  return true;
}
