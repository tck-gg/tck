import { faYoutube, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import VideoCarousel from '@/components/VideoCarousel/VideoCarousel';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';

import { getLatestUploads } from '@/util/youtube';
import { getLatestHighlights } from '@/util/twitch';

import { Video } from '@/types/video';

import classes from './videos.module.scss';

const YOUTUBE_CHANNELS = ['UCJZcsYCqoQ13KtCtApTfLaQ' /* TCK */];
const TWITCH_CHANNELS = ['livetck'];

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  // TODO: Test if this works.
  res.setHeader('Cache-Control', 'public, s-maxage=59, stale-while-revalidate=299');

  const youtubeVideos: Video[] = await getLatestUploads(YOUTUBE_CHANNELS, 15);
  const twitchVideos: Video[] = await getLatestHighlights(TWITCH_CHANNELS, 15);

  return {
    props: {
      youtubeVideos,
      twitchVideos
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
        />
        <VideoCarousel
          icon={<FontAwesomeIcon icon={faTwitch} className={classes.icon} color='#8f46fb' />}
          name='Twitch'
          videos={twitchVideos}
        />
      </div>
    </Layout>
  );
}

export default Videos;
