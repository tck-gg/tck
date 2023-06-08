import { Social } from '@/types/social';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord,
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import classes from './SocialBoxSocial.module.scss';

function SocialBoxSocial({ socialType }: { socialType: Social }) {
  return (
    <div
      className={clsx(
        classes.root,
        socialType === Social.TWITTER
          ? classes.twitter
          : socialType === Social.INSTAGRAM
          ? classes.instagram
          : socialType === Social.FACEBOOK
          ? classes.facebook
          : socialType === Social.DISCORD
          ? classes.discord
          : socialType === Social.TIKTOK
          ? classes.tiktok
          : ''
      )}
    >
      <FontAwesomeIcon
        icon={
          socialType === Social.TWITTER
            ? faTwitter
            : socialType === Social.INSTAGRAM
            ? faInstagram
            : socialType === Social.FACEBOOK
            ? faFacebook
            : socialType === Social.DISCORD
            ? faDiscord
            : socialType === Social.TIKTOK
            ? faTiktok
            : faGlobe
        }
      />
      <p>
        {socialType === Social.TWITTER
          ? 'Twitter'
          : socialType === Social.INSTAGRAM
          ? 'Instagram'
          : socialType === Social.FACEBOOK
          ? 'Facebook'
          : socialType === Social.DISCORD
          ? 'Discord'
          : socialType === Social.TIKTOK
          ? 'TikTok'
          : 'Website'}
      </p>
    </div>
  );
}

export default SocialBoxSocial;
