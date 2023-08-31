export type LeaderboardType = 'stake' | 'gamdom' | 'clash';

export interface ClashLeaderboardEntry {
  userId: number;
  name: string;
  avatar: string;
  active: boolean;
  wagered: number;
  deposited: number;
}

export interface LeaderboardSpot {
  username: string;
  amount: number;
}
