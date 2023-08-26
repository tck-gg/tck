interface LeaderboardApiWagerData {
  month: string;
  total_wager_usd: number;
}

interface LeaderboardApiData {
  user_id: number;
  username: string;
  wager_data: LeaderboardApiWagerData[];
}

export interface LeaderboardApiResponse {
  success: boolean;
  data: LeaderboardApiData;
}
