import { ISocial, Social } from '@/types/social';

import tcktwitch from '../images/social/tcktwitch.png';
import tckbonuses from '../images/social/tckbonuses-twitter.png';
import livetckFacebook from '../images/social/livetck-facebook.png';
import tckhighlightsTiktok from '../images/social/tckhighlights-tiktok.png';
import tckDiscord from '../images/social/tck-discord-2.png';
import livetckInstagram from '../images/social/livetck-instagram.png';

export const SOCIALS_DATA: ISocial[] = [
  {
    image: tcktwitch,
    name: 'TCKTwitch',
    type: Social.TWITTER,
    url: 'https://twitter.com/TCKTwitch'
  },
  {
    image: tckbonuses,
    name: 'TCKBonuses',
    type: Social.TWITTER,
    url: 'https://twitter.com/TCKBonuses'
  },
  {
    image: livetckFacebook,
    name: 'TCK',
    type: Social.FACEBOOK,
    url: 'https://www.facebook.com/LiveTCK'
  },
  {
    image: tckhighlightsTiktok,
    name: 'tckhighlights',
    type: Social.TIKTOK,
    url: 'https://www.tiktok.com/@tckhighlights'
  },
  {
    image: tckDiscord,
    name: 'TCK Discord',
    type: Social.DISCORD,
    url: 'https://discord.gg/TCK'
  },
  {
    image: livetckInstagram,
    name: 'LiveTCK',
    type: Social.INSTAGRAM,
    url: 'https://www.instagram.com/livetck'
  }
];
