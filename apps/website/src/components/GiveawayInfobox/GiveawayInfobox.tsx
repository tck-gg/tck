import { IGiveaway } from 'types';
import { useRouter } from 'next/router';

import classes from './GiveawayInfobox.module.scss';
import Button from '../Button/Button';
import {
  faAngleLeft,
  faAngleRight,
  faBalanceScale,
  faScaleBalanced
} from '@fortawesome/free-solid-svg-icons';
import SmallButton from '../SmallButton/SmallButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Jagged from '../svg/Jagged';

import giveawayCoinImage from '@/images/giveaway-coin.png';
import JaggedBackgroundItem from '../JaggedBackgroundItem/JaggedBackgroundItem';

function GiveawayInfobox({ giveaway }: { giveaway: IGiveaway }) {
  const router = useRouter();

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Button
          leftIcon={faAngleLeft}
          onClick={() => {
            router.push('/giveaways');
          }}
        >
          Back
        </Button>
        <Button>
          <FontAwesomeIcon icon={faBalanceScale} />
        </Button>
      </div>
      <div className={classes.middle}>
        <Image
          width={268}
          height={136}
          src={`https://cdn.tck.gg/giveaways/${giveaway.image}`}
          alt={giveaway.name}
          style={{
            objectFit: 'contain'
          }}
        />

        <div className={classes.info}>
          <p className={classes.name}>{giveaway.name}</p>
          <p className={classes.brand}>{giveaway.brand}</p>
        </div>

        <div>
          <JaggedBackgroundItem fill='#26263A' withShadow>
            <p>nice</p>
          </JaggedBackgroundItem>
        </div>
      </div>
      <div className={classes.bottom}>
        <Button variant='gradient' rightIcon={faAngleRight} fullWidth>
          Enter Giveaway
        </Button>
      </div>
    </div>
  );
}

export default GiveawayInfobox;
