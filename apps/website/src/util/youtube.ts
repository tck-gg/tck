import { Video } from '@/types/video';
import { YouTubeVideo } from '@/types/youtube';

const SAMPLE_DATA = [
  {
    title: 'THE PERFECT SETUP ON DOG HOUSE MEGAWAYS!! (BONUS BUYS)',
    thumbnail: 'https://img.youtube.com/vi/wLmYJcH4uxg/mqdefault.jpg',
    views: 261,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-25T00:28:03Z',
    link: 'https://www.youtube.com/watch?v=wLmYJcH4uxg'
  },
  {
    title: 'WHY I LOVE SWEET BONANZA XMAS SO MUCH!! #casino #slots',
    thumbnail: 'https://img.youtube.com/vi/5_7bBAWQNBU/mqdefault.jpg',
    views: 54,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-24T19:00:03Z',
    link: 'https://www.youtube.com/watch?v=5_7bBAWQNBU'
  },
  {
    title: 'I SPENT $10,000 ON SWEET BONANZA BONUS BUYS!! (INSANE WINS)',
    thumbnail: 'https://img.youtube.com/vi/V8FfjdDFcPM/mqdefault.jpg',
    views: 485,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-23T22:46:01Z',
    link: 'https://www.youtube.com/watch?v=V8FfjdDFcPM'
  },
  {
    title: 'SENSATIONAL $1,000 WIN ON SUGAR RUSH!! #slots #casino',
    thumbnail: 'https://img.youtube.com/vi/yICB7oGlglw/mqdefault.jpg',
    views: 111,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-23T19:00:25Z',
    link: 'https://www.youtube.com/watch?v=yICB7oGlglw'
  },
  {
    title: 'MY BIGGEST RETRO TAPES WIN!! ($10,000+)',
    thumbnail: 'https://img.youtube.com/vi/APSUcLqu_Z8/mqdefault.jpg',
    views: 264,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-22T19:00:09Z',
    link: 'https://www.youtube.com/watch?v=APSUcLqu_Z8'
  },
  {
    title: 'THE 50x CONNECTED ON GATES OF OLYMPUS... (Bonus Buys)',
    thumbnail: 'https://img.youtube.com/vi/7KRjzqgb8ns/mqdefault.jpg',
    views: 1149,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-21T22:07:21Z',
    link: 'https://www.youtube.com/watch?v=7KRjzqgb8ns'
  },
  {
    title: 'INSANE ALL IN WIN ON SLOT!! #slots #bigwin',
    thumbnail: 'https://img.youtube.com/vi/jaRcnT_-y28/mqdefault.jpg',
    views: 167,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-21T19:00:30Z',
    link: 'https://www.youtube.com/watch?v=jaRcnT_-y28'
  },
  {
    title: 'INSANE HACKSAW BONUS BUY SESSION (HUGE COMEBACK)',
    thumbnail: 'https://img.youtube.com/vi/0di-4l1b4go/mqdefault.jpg',
    views: 954,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-20T19:42:08Z',
    link: 'https://www.youtube.com/watch?v=0di-4l1b4go'
  },
  {
    title: 'THE RINGS CONNECTED ALL THE WAY ON GATES OF OLYMPUS!! #slots #bigwin #casino',
    thumbnail: 'https://img.youtube.com/vi/xrBEFtqeeyg/mqdefault.jpg',
    views: 157,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-20T19:00:25Z',
    link: 'https://www.youtube.com/watch?v=xrBEFtqeeyg'
  },
  {
    title: 'THIS NEW HACKSAW SLOT IS ABSOLUTLEY INSANE... (MASSIVE WIN SESSION)',
    thumbnail: 'https://img.youtube.com/vi/IZptmyGIvZk/mqdefault.jpg',
    views: 1031,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-20T02:46:45Z',
    link: 'https://www.youtube.com/watch?v=IZptmyGIvZk'
  },
  {
    title: 'INSANE RAGEBET WIN ON NEW SLOT!! #slots #casino #bigwin',
    thumbnail: 'https://img.youtube.com/vi/UqxfmPypHio/mqdefault.jpg',
    views: 180,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-19T19:00:20Z',
    link: 'https://www.youtube.com/watch?v=UqxfmPypHio'
  },
  {
    title: 'IS SUGAR RUSH XMAS BETTER THAN SUGAR RUSH!? (BONUS BUYS)',
    thumbnail: 'https://img.youtube.com/vi/dicDAnFzLOA/mqdefault.jpg',
    views: 1327,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-18T19:49:13Z',
    link: 'https://www.youtube.com/watch?v=dicDAnFzLOA'
  },
  {
    title: 'INSANE $1,000 RAGEBET WIN ON GATES OF OLYMPUS!! #bigwin #slots',
    thumbnail: 'https://img.youtube.com/vi/pFZ9fN2uNsM/mqdefault.jpg',
    views: 266,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-18T19:00:31Z',
    link: 'https://www.youtube.com/watch?v=pFZ9fN2uNsM'
  },
  {
    title: 'SENSATIONAL $1,500 WIN ON GEMS BONANZA!! #slots #casino',
    thumbnail: 'https://img.youtube.com/vi/qEX-Mc3pCqk/mqdefault.jpg',
    views: 170,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-17T19:00:30Z',
    link: 'https://www.youtube.com/watch?v=qEX-Mc3pCqk'
  },
  {
    title: 'MY BIGGEST MULTI CONNECTION ON ZEUS VS HADES!! (BONUS BUYS)',
    thumbnail: 'https://img.youtube.com/vi/_wy6UMrz4o4/mqdefault.jpg',
    views: 1375,
    avatar:
      'https://yt3.ggpht.com/K117DINt1pdTRPry1vMMpwN8vTJSlZlS1bZ4b9DIV8CUWGuansHfXB_DSm4Orb0NV0IdZeqC=s88-c-k-c0x00ffffff-no-rj',
    author: 'TCK',
    date: '2024-02-16T20:43:37Z',
    link: 'https://www.youtube.com/watch?v=_wy6UMrz4o4'
  }
];

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
  if (!process.env.YOUTUBE_API_KEY) {
    // eslint-disable-next-line no-console
    console.error('Missing environment variables. Using sample YouTube data.');

    return SAMPLE_DATA;
  }

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
