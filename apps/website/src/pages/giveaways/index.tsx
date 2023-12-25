import { getAllGiveaways } from 'database';
import { ISafeGiveaway } from 'types';
import { IconHistoryToggle } from '@tabler/icons-react';

import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import GiveawayBox from '@/components/giveaway/GiveawayBox/GiveawayBox';

import classes from './giveaways.module.scss';

export async function getServerSideProps() {
  const giveaways = await getAllGiveaways();

  return {
    props: {
      giveaways
    }
  };
}

function Giveaways({
  giveaways
}: {
  giveaways: {
    currentGiveaways: ISafeGiveaway[];
    pastGiveaways: ISafeGiveaway[];
  };
}) {
  return (
    <Layout title='Giveaways'>
      <div className={classes.root}>
        <div>
          <PageHeader title='Giveaways' />
          <div className={classes.giveawayBoxWrapper}>
            {giveaways.currentGiveaways.length > 0 ? (
              giveaways.currentGiveaways.map((giveaway) => {
                return <GiveawayBox giveaway={giveaway} key={giveaway.id} />;
              })
            ) : (
              <p
                style={{
                  margin: 'auto'
                }}
              >
                There are no active giveaways.
              </p>
            )}
          </div>
        </div>

        {giveaways.pastGiveaways.length > 0 && (
          <div>
            <div className={classes.iconHeader}>
              <IconHistoryToggle color='#989EAE' />
              <p className={classes.header}>Finished Giveaways</p>
            </div>
            <div className={classes.giveawayBoxWrapper}>
              {giveaways.pastGiveaways.map((giveaway) => {
                return <GiveawayBox giveaway={giveaway} key={giveaway.id} />;
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Giveaways;
