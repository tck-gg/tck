import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import VideoCarousel from '@/components/VideoCarousel/VideoCarousel';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';

import { getLatestUploads } from '@/util/youtube';

import { Video } from '@/types/video';

import { YOUTUBE_CHANNELS } from '@/data/videos';

import styles from './videos.module.scss';
import VideoCard from '@/components/VideoCard/VideoCard';
import RewardCard from '@/components/RewardCard/RewardCard';
import VideoHeader from '@/components/VideoHeader/VideoHeader';
import Button from '@/components/ui/Button/Button';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

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
  const steps = [
    {
      id: 1,
      title: 'Use Our Codes',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 2,
      title: 'Win a Bonus',
      description:
        'Test your luck on the featured sites, win and submit your clips to win even more!'
    },
    {
      id: 3,
      title: 'Submit Clips',
      description:
        'Submit your clips and get rewarded! The clip from each platform with the biggest upvotes wins.'
    }
  ];

  return (
    <Layout title='Video Clips'>
      <PageHeader title='Video Clips' />
      <div className={styles.pageContainer}>
        <div className={styles.stepsGrid}>
          {steps.map((item) => {
            return (
              <div key={item.id} className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepLabel}>STEP</div>
                  <div className={styles.stepNumber}>{item.id}</div>
                </div>
                <div className={styles.stepContent}>
                  <div className={styles.stepTitle}>{item.title}</div>
                  <div className={styles.stepDescription}>{item.description}</div>
                  <div className={styles.stepPlaceholder}></div>
                </div>
              </div>
            );
          })}

          <div className={styles.participateCard}>
            <div className={styles.participateHeader}>
              <div className={styles.participateLabel}>Participate</div>
            </div>
            <div className={styles.participateContent}>
              <div className={styles.participateIconRow}>
                <FontAwesomeIcon icon={faVideo} className={styles.participateIcon} />
                <div className={styles.participateText}>Clip Link</div>
              </div>
              <input type='text' className={styles.participateInput} placeholder='Clip Link...' />
              <Button variant='gradient' fullWidth={true} color='#ffffff'>
                Submit Clip
              </Button>
              <p className={styles.termsText}>
                Terms and Conditions apply. Strictly for 18+ users.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.videoSection}>
          <VideoHeader type='youtube' viewUrl='/videos'>
            Youtube
          </VideoHeader>
          <div className={styles.videoGrid}>
            <RewardCard
              type='youtube'
              viewUrl='/'
              prize='$398'
              description='The clip with the most upvotes and views wins a $250 every month!'
            />
            <VideoCard
              data={{
                id: '123',
                title: 'This is video titile',
                views: '31K',
                rank: 1,
                name: 'string',
                upvote: 1000,
                downvote: 52
              }}
            />
            <VideoCard
              data={{
                id: '123',
                title: 'This is video titile',
                views: '31K',
                rank: 2,
                name: 'string',
                upvote: 1000,
                downvote: 52
              }}
            />
            <VideoCard
              data={{
                id: '123',
                title: 'This is video titile',
                views: '31K',
                rank: 3,
                name: 'string',
                upvote: 1000,
                downvote: 52
              }}
            />
          </div>
        </div>

        <div className={styles.videoSection}>
          <VideoHeader type='instagram' viewUrl='/videos'>
            Instagram
          </VideoHeader>
          <div className={styles.videoGrid}>
            <RewardCard
              type='instagram'
              viewUrl='/'
              prize='$398'
              description='The clip with the most upvotes and views wins a $250 every month!'
            />
            <VideoCard
              data={{
                id: '123',
                title: 'This is video titile',
                views: '31K',
                rank: 1,
                name: 'string',
                upvote: 1000,
                downvote: 52
              }}
            />
            <VideoCard
              data={{
                id: '123',
                title: 'This is video titile',
                views: '31K',
                rank: 1,
                name: 'string',
                upvote: 1000,
                downvote: 52
              }}
            />
            <VideoCard
              data={{
                id: '123',
                title: 'This is video titile',
                views: '31K',
                rank: 1,
                name: 'string',
                upvote: 1000,
                downvote: 52
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Videos;
