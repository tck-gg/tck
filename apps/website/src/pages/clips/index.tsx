import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import VideoClipStep from '@/components/VideoClipStep/VideoClipStep';

import classes from './clips.module.scss';
import VideoClipSubmissionBox from '@/components/VideoClipSubmissionBox/VideoClipSubmissionBox';

function Clips() {
  return (
    <Layout title='Video Clips'>
      <div>
        <PageHeader title='Video Clips' />
        <div className={classes.steps}>
          <VideoClipStep
            title='Use Our Codes'
            content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            step='01'
          />
          <VideoClipStep
            title='Win a Bonus'
            content='Test your luck on the featured sites, win and submit your clips to win even more!'
            step='02'
          />
          <VideoClipStep
            title='Submit Clips'
            content='Submit your clips and get rewarded! The clip from each platform with the biggest upvotes wins.'
            step='03'
          />
          <VideoClipSubmissionBox />
        </div>
      </div>
    </Layout>
  );
}

export default Clips;
