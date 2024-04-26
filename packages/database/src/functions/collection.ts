import { prisma } from '../client';

export async function collectStakeReload(
  stakeUsername: string,
  discordUsername: string
): Promise<boolean> {
  const success = true;

  const cleanStakeUsername = stakeUsername.trim();
  const cleanDiscordUsername = discordUsername.trim();

  const existingStakeEntry = await prisma.stakeReloadEntry.findFirst({
    where: {
      stakeUsername: cleanStakeUsername
    }
  });
  const existingDiscordEntry = await prisma.stakeReloadEntry.findFirst({
    where: {
      discordUsername: cleanDiscordUsername
    }
  });

  if (existingStakeEntry || existingDiscordEntry) {
    return false;
  }

  await prisma.stakeReloadEntry.create({
    data: {
      stakeUsername: cleanStakeUsername,
      discordUsername: cleanDiscordUsername,
      timestamp: Date.now()
    }
  });

  return true;
}

export async function collectRoobetReload(
  roobetUsername: string,
  discordUsername: string
): Promise<boolean> {
  const success = true;

  const cleanRoobetUsername = roobetUsername.trim();
  const cleanDiscordUsername = discordUsername.trim();

  const existingStakeEntry = await prisma.roobetReloadEntry.findFirst({
    where: {
      roobetUsername: cleanRoobetUsername
    }
  });
  const existingDiscordEntry = await prisma.roobetReloadEntry.findFirst({
    where: {
      discordUsername: cleanDiscordUsername
    }
  });

  if (existingStakeEntry || existingDiscordEntry) {
    return false;
  }

  await prisma.roobetReloadEntry.create({
    data: {
      roobetUsername: cleanRoobetUsername,
      discordUsername: cleanDiscordUsername,
      timestamp: Date.now()
    }
  });

  return true;
}

export async function getStakeReloadEntries() {
  return await prisma.stakeReloadEntry.findMany();
}

export async function getRoobetReloadEntries() {
  return await prisma.roobetReloadEntry.findMany();
}
