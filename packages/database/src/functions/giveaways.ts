import { prisma } from '../client';
import { deleteImage } from './backblaze';

export async function getAllGiveaways() {
  const currentGiveaways = await prisma.giveaway.findMany({
    where: {
      timestampEnd: {
        gt: Date.now()
      }
    },
    include: {
      entries: true
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
      entries: true
    },
    orderBy: {
      timestampEnd: 'desc'
    }
  });

  return {
    currentGiveaways,
    pastGiveaways
  };
}

export async function createGiveaway(
  name: string,
  brand: string,
  value: number,
  maxEntries: number,
  timestampEnd: number,
  image: string
) {
  await prisma.giveaway.create({
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
}

export async function updateGiveaway(
  id: string,
  name: string,
  brand: string,
  value: number,
  maxEntries: number,
  timestampEnd: number
) {
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
}

export async function deleteGiveaway(id: string): Promise<boolean> {
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

  // Delete the database entry.
  await prisma.giveaway.delete({
    where: {
      id
    }
  });

  return true;
}

export async function getGiveaway(id: string) {
  return await prisma.giveaway.findUnique({
    where: {
      id
    },
    include: {
      entries: true
    }
  });
}
