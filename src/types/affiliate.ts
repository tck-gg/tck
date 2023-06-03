export type AffiliateTag = 'Slots' | 'Live Games' | 'Originals' | 'Crypto' | 'Battles';

export interface IAffiliate {
  image: string;
  reward: string;
  name: string;
  code: string;
  link: string;
  tags: AffiliateTag[];
  featured: boolean;
}
