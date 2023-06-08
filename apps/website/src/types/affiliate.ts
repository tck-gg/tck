import { StaticImageData } from 'next/image';

export type AffiliateTag = 'Slots' | 'Live Games' | 'Originals' | 'Crypto' | 'Battles' | 'CS:GO';

export interface IAffiliateCode {
  code: string;
  link: string;
}

export interface IAffiliate {
  image: StaticImageData;
  reward: string;
  name: string;
  codes: IAffiliateCode[];
  tags: AffiliateTag[];
  featured: boolean;
}
