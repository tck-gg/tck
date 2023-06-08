import Button from '../Button/Button';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { ISocial, Social } from '@/types/social';

import classes from './SocialBox.module.scss';

function SocialBox({ social }: { social: ISocial }) {
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <p>Nice</p>
      </div>
      <div className={classes.bottom}>
        <Button rightIcon={faAngleRight}>
          {social.type !== Social.DISCORD ? 'Follow' : 'Join'}
        </Button>
      </div>
    </div>
  );
}

export default SocialBox;
