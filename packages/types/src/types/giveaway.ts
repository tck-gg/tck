import { Prisma } from 'database';

export interface ISafeGiveawayEntry {
  id: string;
  username: string;
  slot: number;
}

export interface ISafeGiveaway {
  id: string;
  name: string;
  brand: string;
  value: number;
  maxEntries: number;
  image: string;
  entries: ISafeGiveawayEntry[];
  timestampCreation: number;
  timestampEnd: number;
  winner: string | null;
}

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
