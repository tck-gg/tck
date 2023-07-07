import { Prisma } from 'database';

export type IGiveaway = Prisma.GiveawayGetPayload<{
  include: {
    entries: true;
  };
}>;
