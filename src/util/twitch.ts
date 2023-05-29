import { Video } from '@/types/video';

/**
 * Fetches the latest videos from a list of channels limited by `count`.
 *
 * @param usernames Array of Twitch usernames.
 * @param count Number of videos to fetch total.
 * @returns The latest 15 videos from the list of usernames.
 */
export async function getLatestHighlights(usernames: string[], count: number): Promise<Video[]> {
  let fetchedTwitchVideos: any[] = [];
  const twitchProfilePictures: { [key: string]: string } = {};
  for (let i = 0; i < usernames.length; i++) {
    const loginResponse = await fetch(`https://api.twitch.tv/helix/users?login=${usernames[i]}`, {
      headers: {
        'Client-Id': process.env.TWITCH_CLIENT_ID || '',
        Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`
      }
    });
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
  fetchedTwitchVideos = fetchedTwitchVideos
    .flat()
    .sort((a, b) => {
      return new Date(b.published_at).valueOf() - new Date(a.published_at).valueOf();
    })
    .slice(0, count);

  // Builder
  return fetchedTwitchVideos.map((video: any) => {
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
}
