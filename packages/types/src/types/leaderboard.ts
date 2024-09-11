export type LeaderboardType =
  | 'stake'
  | 'gamdom'
  | 'clash'
  | 'csgobig'
  | 'packdraw'
  | 'roobet'
  | 'hypedrop';

export type LeaderboardRewardType = 'cash' | 'none' | LeaderboardType;
export interface LeaderboardSpot {
  username: string;
  amount: number;
  avatar: string;
}
