import { endGiveaway, getAllGiveaways } from 'database';
import { IGiveaway } from 'types';

(async () => {
  const giveaways = await getAllGiveaways();

  giveaways.currentGiveaways.forEach((giveaway: IGiveaway) => {
    const timeout = giveaway.timestampEnd - Date.now();
    setTimeout(async () => {
      await endGiveaway(giveaway.id);
    }, timeout);
  });
})();
