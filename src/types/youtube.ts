export interface YouTubeVideo {
  kind: string;
  etag: string;
  id: string;
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

export interface YouTubeVideoStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}
export interface YouTubeVideoStatisticsItem {
  kind: string;
  etag: string;
  id: string;
  statistics: YouTubeVideoStatistics;
}
