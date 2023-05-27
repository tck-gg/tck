import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import { faYoutube, faTiktok, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './videos.module.scss';

function Videos() {
  return (
    <Layout title='Videos'>
      <PageHeader title='Videos' />
      <div className={classes.sectionWrapper}>
        <div className={classes.section}>
          <p className={classes.social}>
            <FontAwesomeIcon icon={faYoutube} className={classes.icon} color='#f81e1e' />
            YouTube
          </p>
          <div className={classes.videoWrapper}>
            <p>Stuff</p>
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
