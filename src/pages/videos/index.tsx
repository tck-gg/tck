import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import { faYoutube, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import VideoCarousel from '@/components/VideoCarousel/VideoCarousel';

import { YouTubeVideo } from '@/types/youtube';
import { Video } from '@/types/video';

import classes from './videos.module.scss';

const fetchedYouTubeChannels = ['UCJZcsYCqoQ13KtCtApTfLaQ' /* TCK */];

const fetchedTwitchChannels = ['livetck'];

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  // TODO: Test if this works.
  res.setHeader('Cache-Control', 'public, s-maxage=59, stale-while-revalidate=299');

  // YouTube
  // This uses 2 credits per channel + 2 credits out of 10000 daily.
  let fetchedYoutubeVideos: YouTubeVideo[] = [];
  for (let i = 0; i < fetchedYouTubeChannels.length; i++) {
    // Get uploads.
    const contentDetails = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${fetchedYouTubeChannels[i]}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await contentDetails.json();
    const uploadsPlaylistId = data.items[0].contentDetails.relatedPlaylists.uploads;

    // Get video info.
    const videos = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=15&playlistId=${uploadsPlaylistId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const videoData = await videos.json();
    fetchedYoutubeVideos.push(videoData.items);
  }
  fetchedYoutubeVideos = fetchedYoutubeVideos.flat().sort((a, b) => {
    return (
      new Date(b.contentDetails.videoPublishedAt).valueOf() -
      new Date(a.contentDetails.videoPublishedAt).valueOf()
    );
  });

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
  const channelIds = fetchedYouTubeChannels.join(',');
  const channelResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const channelData = await channelResponse.json();
  for (let i = 0; i < channelData.items.length; i++) {
    youtubeProfilePictures[channelData.items[i].id] =
      channelData.items[i].snippet.thumbnails.default.url;
  }

  // Builder
  const youtubeVideos: Video[] = fetchedYoutubeVideos.map((video: YouTubeVideo) => {
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

  // Twitch
  let fetchedTwitchVideos: any[] = [];
  const twitchProfilePictures: { [key: string]: string } = {};
  for (let i = 0; i < fetchedTwitchChannels.length; i++) {
    const loginResponse = await fetch(
      `https://api.twitch.tv/helix/users?login=${fetchedTwitchChannels[i]}`,
      {
        headers: {
          'Client-Id': process.env.TWITCH_CLIENT_ID || '',
          Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`
        }
      }
    );
    const loginData = await loginResponse.json();
    const userId = loginData.data[0].id;
    twitchProfilePictures[loginData.data[0].display_name] = loginData.data[0].profile_image_url;

    const twitchVideosResponse = await fetch(
      `https://api.twitch.tv/helix/videos?user_id=${userId}&type=highlight&first=15`,
      {
        headers: {
          'Client-Id': process.env.TWITCH_CLIENT_ID || '',
          Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`
        }
      }
    );
    const twitchVideosData = await twitchVideosResponse.json();
    fetchedTwitchVideos.push(twitchVideosData.data);
  }
  fetchedTwitchVideos = fetchedTwitchVideos.flat().sort((a, b) => {
    return new Date(b.published_at).valueOf() - new Date(a.published_at).valueOf();
  });

  // Builder
  const twitchVideos: Video[] = fetchedTwitchVideos.map((video: any) => {
    return {
      title: video.title,
      thumbnail: video.thumbnail_url.replace('%{width}', '320').replace('%{height}', '180'),
      views: video.view_count,
      avatar: twitchProfilePictures[video.user_name],
      author: video.user_name,
      date: video.published_at,
      link: `https://www.twitch.tv/videos/${video.id}`
    };
  });

  return {
    props: {
      youtubeVideos,
      youtubeViews,
      youtubeProfilePictures,
      twitchVideos,
      twitchProfilePictures
    }
  };
}

function Videos({
  youtubeVideos,
  twitchVideos
}: {
  youtubeVideos: Video[];
  twitchVideos: Video[];
}) {
  return (
    <Layout title='Videos'>
      <PageHeader title='Videos' />
      <div className={classes.sectionWrapper}>
        <VideoCarousel
          icon={<FontAwesomeIcon icon={faYoutube} className={classes.icon} color='#f81e1e' />}
          name='YouTube'
          videos={youtubeVideos}
          display={5}
        />
        <VideoCarousel
          icon={<FontAwesomeIcon icon={faTwitch} className={classes.icon} color='#8f46fb' />}
          name='Twitch'
          videos={twitchVideos}
          display={5}
        />
      </div>
    </Layout>
  );
}

export default Videos;
