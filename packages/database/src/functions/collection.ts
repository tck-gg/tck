import { prisma } from '../client';

export async function collectStakeReload(
  stakeUsername: string,
  discordUsername: string
): Promise<boolean> {
  let success = true;

  try {
    await prisma.stakeReloadEntry.create({
      data: {
        stakeUsername: stakeUsername.trim(),
        discordUsername: discordUsername.trim(),
        timestamp: Date.now()
      }
    });
  } catch (e) {
    success = false;
  }

  return success;
}

export async function getStakeReloadEntries() {
  return await prisma.stakeReloadEntry.findMany();
}
