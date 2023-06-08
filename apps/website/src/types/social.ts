export enum Social {
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  INSTAGRAM = 'instagram',
  TIKTOK = 'tiktok',
  DISCORD = 'discord'
}

export interface ISocial {
  image: string;
  name: string;
  type: Social;
  url: string;
}
