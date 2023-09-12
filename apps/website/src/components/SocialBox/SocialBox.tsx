import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

import Button from '@/components/ui/Button/Button';

import { ISocial, Social } from '@/types/social';

import classes from './SocialBox.module.scss';
import SocialBoxSocial from '../SocialBoxSocial/SocialBoxSocial';

function SocialBox({ social }: { social: ISocial }) {
  function handleClick() {
    window.open(social.url, '_blank');
  }

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Image
          className={classes.image}
          src={social.image}
          width={75}
          height={75}
          alt={social.name}
          style={{
            objectFit: 'cover'
          }}
        />
        <div className={classes.info}>
          <p className={classes.name}>{social.name}</p>
          <SocialBoxSocial socialType={social.type} />
        </div>
      </div>
      <div className={classes.bottom}>
        <Button rightIcon={faAngleRight} onClick={handleClick}>
          {social.type !== Social.DISCORD ? 'Follow' : 'Join'}
        </Button>
      </div>
    </div>
  );
}

export default SocialBox;
