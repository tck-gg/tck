import { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import { faYoutube, faTiktok, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { unique } from '@reverse/array';

import { YouTubeVideo } from '@/types/youtube';

import classes from './videos.module.scss';
import VideoBox from '@/components/VideoBox/VideoBox';

const fetchedYouTubeChannels = ['UCJZcsYCqoQ13KtCtApTfLaQ' /* TCK */];

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  res.setHeader('Cache-Control', 'public, s-maxage=59, stale-while-revalidate=299');

  // This uses 4 credits out of 10000 daily, making for 2500 daily requests.
  let youtubeVideos: YouTubeVideo[] = [];
  const youtubeViews: { [key: string]: number } = {};
  const youtubeProfilePictures: { [key: string]: string } = {};

  for (let i = 0; i < fetchedYouTubeChannels.length; i++) {
    // Get uploads.
    const contentDetails = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${fetchedYouTubeChannels[i]}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await contentDetails.json();
    const uploadsPlaylistId = data.items[0].contentDetails.relatedPlaylists.uploads;

    // Get video info.
    const videos = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=12&playlistId=${uploadsPlaylistId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const videoData = await videos.json();
    youtubeVideos.push(videoData.items);

    // Get views.
    const videoIds = videoData.items
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
    const channelIds = unique(
      (videoData.items as YouTubeVideo[]).map((video) => {
        return video.snippet.channelId;
      })
    ).join(',');
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const channelData = await channelResponse.json();
    for (let i = 0; i < channelData.items.length; i++) {
      youtubeProfilePictures[channelData.items[i].id] =
        channelData.items[i].snippet.thumbnails.default.url;
    }
  }

  youtubeVideos = youtubeVideos.flat().sort((a, b) => {
    return (
      new Date(b.contentDetails.videoPublishedAt).valueOf() -
      new Date(a.contentDetails.videoPublishedAt).valueOf()
    );
  });

  return {
    props: {
      youtubeVideos,
      youtubeViews,
      youtubeProfilePictures,
      date: new Date().toISOString()
    }
  };
}

function Videos({
  youtubeVideos,
  youtubeViews,
  youtubeProfilePictures,
  date
}: {
  youtubeVideos: YouTubeVideo[];
  youtubeViews: { [key: string]: number };
  youtubeProfilePictures: { [key: string]: string };
  date: string;
}) {
  const [youtubePage, setYoutubePage] = useState<number>(1);

  return (
    <Layout title='Videos'>
      <PageHeader title='Videos' />
      <div className={classes.sectionWrapper}>
        <div className={classes.section}>
          <p className={classes.social}>
            <FontAwesomeIcon icon={faYoutube} className={classes.icon} color='#f81e1e' />
            YouTube
          </p>
          <div>This page is generated on {date}</div>
          <div className={classes.videoWrapper}>
            {youtubeVideos
              .map((video) => {
                return (
                  <VideoBox
                    thumbnail={`https://img.youtube.com/vi/${video.contentDetails.videoId}/mqdefault.jpg`}
                    title={video.snippet.title}
                    views={youtubeViews[video.contentDetails.videoId]}
                    avatar={youtubeProfilePictures[video.snippet.channelId]}
                    author={video.snippet.channelTitle}
                    date={video.contentDetails.videoPublishedAt}
                    key={video.contentDetails.videoId}
                    link={`https://www.youtube.com/watch?v=${video.contentDetails.videoId}`}
                  />
                );
              })
              .splice((youtubePage - 1) * 5, 5)}
          </div>
        </div>

        <div className={classes.section}>
          <p className={classes.social}>
            <FontAwesomeIcon icon={faTiktok} className={classes.icon} color='#ff1f64' />
            TikTok
          </p>
          <div className={classes.videoWrapper}>
            <p>Stuff</p>
          </div>
        </div>
        <div className={classes.section}>
          <p className={classes.social}>
            <FontAwesomeIcon icon={faTwitch} className={classes.icon} color='#8f46fb' />
            Twitch
          </p>
          <div className={classes.videoWrapper}>
            <p>Stuff</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Videos;
