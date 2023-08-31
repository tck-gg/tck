interface GamdomLeaderboardApiWagerData {
  month: string;
  total_wager_usd: number;
}

interface GamdomLeaderboardApiData {
  user_id: number;
  username: string;
  wager_data: GamdomLeaderboardApiWagerData[];
}

export interface GamdomLeaderboardApiResponse {
  success: boolean;
  data: GamdomLeaderboardApiData[];
}
