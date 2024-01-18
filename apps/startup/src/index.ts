import { endGiveaway, getAllGiveaways } from 'database';
import { IGiveaway, ISafeGiveaway } from 'types';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://9fcc3440f8998fce0e0bb0b0f69002db@o4505824725172224.ingest.sentry.io/4505824793329664',
    integrations: [new ProfilingIntegration()],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    environment: process.env.NODE_ENV
  });
}

(async () => {
  const giveaways = await getAllGiveaways();

  giveaways.currentGiveaways.forEach((giveaway: ISafeGiveaway) => {
    const timeout = giveaway.timestampEnd - Date.now();
    setTimeout(async () => {
      await endGiveaway(giveaway.id);
    }, timeout);
  });
})();
