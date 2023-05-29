import { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import { faYoutube, faTiktok, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
('@fortawesome/free-solid-svg-icons');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { unique } from '@reverse/array';

import SmallButton from '@/components/SmallButton/SmallButton';
import VideoBox from '@/components/VideoBox/VideoBox';

import { YouTubeVideo } from '@/types/youtube';

import classes from './videos.module.scss';

const fetchedYouTubeChannels = ['UCJZcsYCqoQ13KtCtApTfLaQ' /* TCK */];

const fetchedTwitchChannels = ['livetck'];

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  // TODO: Test if this works.
  res.setHeader('Cache-Control', 'public, s-maxage=59, stale-while-revalidate=299');

  // YouTube
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
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=15&playlistId=${uploadsPlaylistId}&key=${process.env.YOUTUBE_API_KEY}`
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

  // Twitch
  let twitchVideos: any[] = [];
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
    twitchVideos.push(twitchVideosData.data);
  }
  twitchVideos = twitchVideos.flat().sort((a, b) => {
    return new Date(b.published_at).valueOf() - new Date(a.published_at).valueOf();
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
  youtubeViews,
  youtubeProfilePictures,
  twitchVideos,
  twitchProfilePictures
}: {
  youtubeVideos: YouTubeVideo[];
  youtubeViews: { [key: string]: number };
  youtubeProfilePictures: { [key: string]: string };
  twitchVideos: any[];
  twitchProfilePictures: { [key: string]: string };
}) {
  const [youtubePage, setYoutubePage] = useState<number>(1);
  const [twitchPage, setTwitchPage] = useState<number>(1);

  function handleControlClick(direction: 'left' | 'right', type: 'youtube' | 'tiktok' | 'twitch') {
    if (type === 'youtube') {
      if (direction === 'left') {
        setYoutubePage(youtubePage - 1);
      } else {
        setYoutubePage(youtubePage + 1);
      }
    } else if (type === 'twitch') {
      if (direction === 'left') {
        setTwitchPage(twitchPage - 1);
      } else {
        setTwitchPage(twitchPage + 1);
      }
    }
  }

  return (
    <Layout title='Videos'>
      <PageHeader title='Videos' />
      <div className={classes.sectionWrapper}>
        <div className={classes.section}>
          <div className={classes.sectionHeader}>
            <p className={classes.social}>
              <FontAwesomeIcon icon={faYoutube} className={classes.icon} color='#f81e1e' />
              YouTube
            </p>
            <div className={classes.controls}>
              <SmallButton
                icon={faArrowLeft}
                disabled={youtubePage === 1}
                onClick={() => {
                  handleControlClick('left', 'youtube');
                }}
              />
              <SmallButton
                icon={faArrowRight}
                disabled={youtubePage === Math.ceil(youtubeVideos.length / 5)}
                onClick={() => {
                  handleControlClick('right', 'youtube');
                }}
              />
            </div>
          </div>
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

        {/* <div className={classes.section}>
          <p className={classes.social}>
            <FontAwesomeIcon icon={faTiktok} className={classes.icon} color='#ff1f64' />
            TikTok
          </p>
          <div className={classes.videoWrapper}>
            <p>Stuff</p>
          </div>
        </div> */}

        <div className={classes.section}>
          <div className={classes.sectionHeader}>
            <p className={classes.social}>
              <FontAwesomeIcon icon={faTwitch} className={classes.icon} color='#8f46fb' />
              Twitch
            </p>
            <div className={classes.controls}>
              <SmallButton
                icon={faArrowLeft}
                disabled={twitchPage === 1}
                onClick={() => {
                  handleControlClick('left', 'twitch');
                }}
              />
              <SmallButton
                icon={faArrowRight}
                disabled={twitchPage === Math.ceil(twitchVideos.length / 5)}
                onClick={() => {
                  handleControlClick('right', 'twitch');
                }}
              />
            </div>
          </div>
          <div className={classes.videoWrapper}>
            {twitchVideos
              .map((video) => {
                return (
                  <VideoBox
                    thumbnail={video.thumbnail_url
                      .replace('%{width}', '320')
                      .replace('%{height}', '180')}
                    title={video.title}
                    views={video.view_count}
                    avatar={twitchProfilePictures[video.user_name]}
                    author={video.user_name}
                    date={video.published_at}
                    key={video.id}
                    link={`https://www.twitch.tv/videos/${video.id}`}
                  />
                );
              })
              .splice((twitchPage - 1) * 5, 5)}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Videos;
