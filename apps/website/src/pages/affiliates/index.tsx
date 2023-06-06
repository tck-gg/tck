import AffiliateBox from '@/components/AffiliateBox/AffiliateBox';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';

import { IAffiliate } from '@/types/affiliate';

import { AFFILIATES } from '@/data/affiliates';

import classes from './affiliates.module.scss';

function Affiliates() {
  return (
    <Layout title='Affiliates'>
      <PageHeader title='Affiliates' />

      <div className={classes.affiliateWrapper}>
        {AFFILIATES.map((affiliate: IAffiliate) => {
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
        })}
      </div>
    </Layout>
  );
}

export default Affiliates;
