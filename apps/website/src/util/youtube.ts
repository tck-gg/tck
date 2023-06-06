import { Video } from '@/types/video';
import { YouTubeVideo } from '@/types/youtube';

/**
 * Fetches the latest videos from a list of channels limited by `count`.
 *
 * Uses **2 credits** channel plus **2 credits** total.
 *
 * @param channelIds An array of channel IDs. Get this from the user's YouTube channel's About page.
 * @param count The number of videos to fetch total.
 * @returns An array of videos.
 */
export async function getLatestUploads(channelIds: string[], count: number): Promise<Video[]> {
  let fetchedYoutubeVideos: YouTubeVideo[] = [];
  for (let i = 0; i < channelIds.length; i++) {
    // Get uploads.
    const contentDetails = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelIds[i]}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await contentDetails.json();
    const uploadsPlaylistId = data.items[0].contentDetails.relatedPlaylists.uploads;

    // Get video info.
    const videos = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=${count}&playlistId=${uploadsPlaylistId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const videoData = await videos.json();
    fetchedYoutubeVideos.push(videoData.items);
  }
  fetchedYoutubeVideos = fetchedYoutubeVideos
    .flat()
    .sort((a, b) => {
      return (
        new Date(b.contentDetails.videoPublishedAt).valueOf() -
        new Date(a.contentDetails.videoPublishedAt).valueOf()
      );
    })
    .slice(0, count);

  // Get views.
  const youtubeViews: { [key: string]: number } = {};
  const videoIds = fetchedYoutubeVideos
    .map((video: YouTubeVideo) => {
      return video.contentDetails.videoId;
    })
    .join(',');
  const statisticsResponse = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const statisticsData = await statisticsResponse.json();
  for (let i = 0; i < statisticsData.items.length; i++) {
    youtubeViews[statisticsData.items[i].id] = parseInt(
      statisticsData.items[i].statistics.viewCount
    );
  }

  // Get profile pictures.
  const youtubeProfilePictures: { [key: string]: string } = {};
  const channelIdsStringed = channelIds.join(',');
  const channelResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIdsStringed}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const channelData = await channelResponse.json();
  for (let i = 0; i < channelData.items.length; i++) {
    youtubeProfilePictures[channelData.items[i].id] =
      channelData.items[i].snippet.thumbnails.default.url;
  }

  // Builder
  return fetchedYoutubeVideos.map((video: YouTubeVideo) => {
    const videoId = video.contentDetails.videoId;
    return {
      title: video.snippet.title,
      thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      views: youtubeViews[videoId],
      avatar: youtubeProfilePictures[video.snippet.channelId],
      author: video.snippet.channelTitle,
      date: video.contentDetails.videoPublishedAt,
      link: `https://www.youtube.com/watch?v=${video.contentDetails.videoId}`
    };
  });
}
