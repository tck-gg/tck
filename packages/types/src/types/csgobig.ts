export interface CsgoBigLeaderboardEntry {
  id: string;
  name: string;
  level: number;
  wagerTotal: number;
  totalDeposits: number;
  totalRewards: number;
}

export type CsgoBigLeaderboardApiResponse =
  | {
      success: true;
      results: CsgoBigLeaderboardEntry[];
    }
  | {
      success: false;
      error: string;
    };
