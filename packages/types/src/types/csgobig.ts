export interface CsgoBigLeaderboardEntry {
  id: string;
  name: string;
  level: number;
  wagerTotal: number;
  totalDeposits: number;
  totalRewards: number;
}

export interface CsgoBigLeaderboardApiResponse {
  success: boolean;
  results: CsgoBigLeaderboardEntry[];
}
