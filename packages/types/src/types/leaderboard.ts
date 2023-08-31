export type LeaderboardType = 'stake' | 'gamdom' | 'clash';

export interface LeaderboardSpot {
  username: string;
  amount: number;
  avatar: string;
}
