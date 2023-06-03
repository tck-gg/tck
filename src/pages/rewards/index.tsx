import AffiliateBox from '@/components/AffiliateBox/AffiliateBox';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';

import { IAffiliate } from '@/types/affiliate';

import { AFFILIATES } from '@/data/affiliates';

import classes from './rewards.module.scss';

function Rewards() {
  return (
    <Layout title='Rewards'>
      <PageHeader title='Rewards' />

      <div className={classes.affiliateWrapper}>
        {AFFILIATES.map((affiliate: IAffiliate) => {
          return (
            <AffiliateBox
              key={affiliate.name}
              image={affiliate.image}
              reward={affiliate.reward}
              name={affiliate.name}
              code={affiliate.code}
              link={affiliate.link}
              tags={affiliate.tags}
              featured={affiliate.featured}
            />
          );
        })}
      </div>
    </Layout>
  );
}

export default Rewards;
