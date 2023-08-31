export type LeaderboardType = 'stake' | 'gamdom' | 'clash';

export type LeaderboardRewardType = 'cash' | 'none' | LeaderboardType;
export interface LeaderboardSpot {
  username: string;
  amount: number;
  avatar: string;
}
