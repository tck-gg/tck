import { useRouter } from 'next/router';
import clsx from 'clsx';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Layout from '@/components/Layout/Layout';
import Button from '@/components/Button/Button';
import AffiliateBox from '@/components/AffiliateBox/AffiliateBox';

import { AFFILIATES } from '@/data/affiliates';

import classes from './index.module.scss';

function Home() {
  const router = useRouter();
  return (
    <Layout>
      <div className={classes.sectionWrapper}>
        <div className={clsx(classes.section, classes.hero)}>
          <div className={classes.splashGroup}>
            <p className={classes.sectionDescription}>Claim Free Rewards</p>
            <p className={classes.big}>The Most Rewarding Website</p>
            <p className={classes.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className={classes.buttonGroup}>
            <Button
              variant='gradient'
              rightIcon={faAngleRight}
              onClick={() => {
                router.push('/affiliates');
              }}
            >
              Explore Rewards
            </Button>
            <Button
              variant='primary'
              rightIcon={faAngleRight}
              onClick={() => {
                router.push('/videos');
              }}
            >
              Watch
            </Button>
          </div>
        </div>
        <div className={classes.section}>
          <div className={classes.sectionHeader}>
            <p className={classes.sectionDescription}>Affiliate Codes</p>
            <p className={classes.sectionTitle}>Free Rewards</p>
          </div>
          <div className={classes.affiliateWrapper}>
            {AFFILIATES.filter((affiliate) => {
              return affiliate.featured;
            })
              .map((affiliate) => {
                return (
                  <AffiliateBox
                    key={affiliate.name}
                    image={affiliate.image}
                    reward={affiliate.reward}
                    name={affiliate.name}
                    codes={affiliate.codes}
                    tags={affiliate.tags}
                    featured={affiliate.featured}
                  />
                );
              })
              .splice(0, 4)}
          </div>
          <Button
            rightIcon={faAngleRight}
            onClick={() => {
              router.push('/affiliates');
            }}
          >
            Discover More
          </Button>
        </div>
        <div className={classes.section}>
          <div className={classes.sectionHeader}>
            <p className={classes.sectionDescription}>Stay Up to Date</p>
            <p className={classes.sectionTitle}>More TCK Content</p>
          </div>
          <div>
            <p>TODO</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
