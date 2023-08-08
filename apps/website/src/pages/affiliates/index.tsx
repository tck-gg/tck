/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import AffiliateBox from '@/components/AffiliateBox/AffiliateBox';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';

import { useAgeVerification } from '@/hooks/age-verification';

import { IAffiliate } from '@/types/affiliate';

import { AFFILIATES } from '@/data/affiliates';

import classes from './affiliates.module.scss';

function Affiliates() {
  const [cookie, setCookie] = useCookies(['hasVerifiedAge']);
  const [isVerified, setIsVerified] = useState(cookie.hasVerifiedAge === 'true');
  const ageVerification = useAgeVerification();

  useEffect(() => {
    if (!isVerified) {
      ageVerification.verify(() => {
        setIsVerified(true);
      });
    }
  }, []);

  return (
    <Layout title='Affiliates'>
      <PageHeader title='Affiliates' />

      <div className={classes.affiliateWrapper}>
        {isVerified ? (
          AFFILIATES.map((affiliate: IAffiliate) => {
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
        ) : (
          <p>You are not permitted to view this content.</p>
        )}
      </div>
    </Layout>
  );
}

export default Affiliates;
