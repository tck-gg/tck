export interface CsgoBigLeaderboardEntry {
  id: string;
  name: string;
  img: string;
  total: number;
}

export interface CsgoBigLeaderboardApiResponse {
  success: boolean;
  results: CsgoBigLeaderboardEntry[];
}
