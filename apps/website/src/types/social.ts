import { StaticImageData } from 'next/image';

export enum Social {
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  INSTAGRAM = 'instagram',
  TIKTOK = 'tiktok',
  DISCORD = 'discord'
}

export interface ISocial {
  image: StaticImageData;
  name: string;
  type: Social;
  url: string;
}
