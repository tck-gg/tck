import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import VideoCarousel from '@/components/VideoCarousel/VideoCarousel';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';

import { getLatestUploads } from '@/util/youtube';

import { Video } from '@/types/video';

import { YOUTUBE_CHANNELS } from '@/data/videos';

import classes from './videos.module.scss';

export async function getStaticProps({ req, res }: { req: any; res: any }) {
  const youtubeVideos: Video[] = await getLatestUploads(YOUTUBE_CHANNELS, 15);

  return {
    props: {
      youtubeVideos
    },
    revalidate: 3600
  };
}

function Videos({ youtubeVideos }: { youtubeVideos: Video[] }) {
  return (
    <Layout title='Videos'>
      <PageHeader title='Videos' />
      <div className={classes.sectionWrapper}>
        <VideoCarousel
          icon={<FontAwesomeIcon icon={faYoutube} className={classes.icon} color='#f81e1e' />}
          name='YouTube'
          videos={youtubeVideos}
        />
      </div>
    </Layout>
  );
}

export default Videos;
