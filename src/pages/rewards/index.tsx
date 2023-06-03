import AffiliateBox, { Tag } from '@/components/AffiliateBox/AffiliateBox';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';

import classes from './rewards.module.scss';

interface IAffiliate {
  image: string;
  reward: string;
  name: string;
  code: string;
  link: string;
  tags: Tag[];
  featured: boolean;
}

const AFFILIATES: IAffiliate[] = [
  {
    image: 'https://via.placeholder.com/142x39',
    reward: '100% up to $1000',
    name: 'Wild Casino',
    code: 'WILD100',
    link: 'https://google.com',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto', 'Battles'],
    featured: true
  },
  {
    image: 'https://via.placeholder.com/142x39',
    reward: '100% up to $1000',
    name: 'Wild Casino',
    code: 'WILD100',
    link: 'https://google.com',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto', 'Battles'],
    featured: true
  },
  {
    image: 'https://via.placeholder.com/142x39',
    reward: '100% up to $1000',
    name: 'Wild Casino',
    code: 'WILD100',
    link: 'https://google.com',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto', 'Battles'],
    featured: true
  },
  {
    image: 'https://via.placeholder.com/142x39',
    reward: '100% up to $1000',
    name: 'Wild Casino',
    code: 'WILD100',
    link: 'https://google.com',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto', 'Battles'],
    featured: true
  },
  {
    image: 'https://via.placeholder.com/142x39',
    reward: '100% up to $1000',
    name: 'Wild Casino',
    code: 'WILD100',
    link: 'https://google.com',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto', 'Battles'],
    featured: false
  },
  {
    image: 'https://via.placeholder.com/142x39',
    reward: '100% up to $1000',
    name: 'Wild Casino',
    code: 'WILD100',
    link: 'https://google.com',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto', 'Battles'],
    featured: false
  },
  {
    image: 'https://via.placeholder.com/142x39',
    reward: '100% up to $1000',
    name: 'Wild Casino',
    code: 'WILD100',
    link: 'https://google.com',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto', 'Battles'],
    featured: false
  },
  {
    image: 'https://via.placeholder.com/142x39',
    reward: '100% up to $1000',
    name: 'Wild Casino',
    code: 'WILD100',
    link: 'https://google.com',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto', 'Battles'],
    featured: false
  },
  {
    image: 'https://via.placeholder.com/142x39',
    reward: '100% up to $1000',
    name: 'Wild Casino',
    code: 'WILD100',
    link: 'https://google.com',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto', 'Battles'],
    featured: false
  },
  {
    image: 'https://via.placeholder.com/142x39',
    reward: '100% up to $1000',
    name: 'Wild Casino',
    code: 'WILD100',
    link: 'https://google.com',
    tags: ['Slots', 'Live Games', 'Originals', 'Crypto', 'Battles'],
    featured: false
  }
];

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
