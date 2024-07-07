/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import AffiliateBox from '@/components/AffiliateBox/AffiliateBox';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';

import { useAgeVerification } from '@/hooks/age-verification';

import { IAffiliate } from '@/types/affiliate';

import { AFFILIATES } from '@/data/affiliates';

import styles from './affiliates.module.scss';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import Image from 'next/image';

import roobetLogo from '../../images/affiliate/roobet.png';
import gamdomLogo from '../../images/affiliate/gamdom.png';
import csgobigLogo from '../../images/affiliate/csgobig.png';
import roobet from '../../images/affiliate/acc/roobet.png';
import gamdom from '../../images/affiliate/acc/gamdom.png';
import csgobig from '../../images/affiliate/acc/csgobig.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const placeholder = [
  {
    name: 'roobet',
    logo: roobetLogo,
    header: 'Instant Rewards & Free Spins',
    description: 'Click on the button below to register instantly.',
    acc: roobet,
    url: '/affiliates',
    buttonGradient: 'linear-gradient(#DDB43F, #9B7C25)',
    primaryColor: '#DDB43F'
  },
  {
    name: 'gamdom',
    logo: gamdomLogo,
    header: '15% Rakeback for 7 Days',
    description: 'Click on the button below to register instantly.',
    acc: gamdom,
    url: '/affiliates',
    buttonGradient: 'linear-gradient(#00DA72, #008847)',
    primaryColor: '#00DA72'
  },
  {
    name: 'csgobig',
    logo: csgobigLogo,
    header: 'Rakeback & Daily Cases',
    description: 'Click on the button below to register instantly.',
    acc: csgobig,
    url: '/affiliates',
    buttonGradient: 'linear-gradient(#E1B56F, #94713B)',
    primaryColor: '#E1B56F'
  }
];

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

      <div className={styles.sectionWrapper}>
        <SectionHeader type='star'>Featured</SectionHeader>
        <div className={styles.featuredList}>
          {placeholder.map((item, index) => {
            return (
              <div key={item.name} className={styles.featuredItem}>
                <Image src={item.logo} alt={`${item.name} logo`} className={styles.featuredLogo} />
                <div className={styles.featuredContent}>
                  <div className={styles.featuredHeader}>{item.header}</div>
                  <div className={styles.featuredDescription}>{item.description}</div>
                </div>
                <Image src={item.acc} alt={`${item.name}`} className={styles.featuredAcc} />
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.featuredButton}
                    style={{ background: item.buttonGradient }}
                  >
                    <div className={styles.buttonTextWrapper}>
                      <div>Register Instantly</div>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </button>
                </div>
                <span className={styles.featuredTerms}>
                  Strictly 18+, Terms and Conditions may apply.
                </span>
                <div
                  className={styles.featuredOverlay}
                  style={{
                    background: `radial-gradient(circle, ${item.primaryColor} 0%, ${item.primaryColor}00 50%)`
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.sectionWrapper}>
        <SectionHeader type='crypto'>Crypto</SectionHeader>
        <div className={styles.affiliateWrapper}>
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
      </div>
    </Layout>
  );
}

export default Affiliates;
