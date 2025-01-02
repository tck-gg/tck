import { sum } from 'lodash';

// 15,000
export const ROOBET_PRIZES = [5625, 3375, 2250, 1125, 825, 600, 450, 375, 225, 150];
export const ROOBET_PRIZES_TOTAL = sum(ROOBET_PRIZES);

// 5,000
export const CSGOBIG_PRIZES = [1875, 1125, 750, 375, 275, 200, 150, 125, 75, 50];
export const CSGOBIG_PRIZES_TOTAL = sum(CSGOBIG_PRIZES);
