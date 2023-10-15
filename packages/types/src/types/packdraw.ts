interface PackDrawLeaderboardSpot {
  image: string;
  isActive: boolean;
  userId: string;
  username: string;
  wagerAmount: number;
}

export interface PackdrawLeaderboardApiData {
  leaderboard: PackDrawLeaderboardSpot[];
}
