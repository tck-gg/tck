import { Prisma } from 'database';

export type IGiveaway = Prisma.GiveawayGetPayload<{
  include: {
    entries: {
      include: {
        user: true;
      };
    };
    winner: true;
  };
}>;

export type IGiveawayEntry = Prisma.GiveawayEntryGetPayload<{
  include: {
    user: true;
  };
}>;
