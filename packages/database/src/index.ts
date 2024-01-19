import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

export * from './client';

export * from './functions/admin';
export * from './functions/auth';
export * from './functions/backblaze';
export * from './functions/collection';
export * from './functions/giveaways';
export * from './functions/ip';
export * from './functions/kick/kick-raffle';
export * from './functions/kick/kick';
export * from './functions/leaderboard';
export * from './functions/permissions';
export * from './functions/user';

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://c4b3693a0da99d61e927970a414bcc88@o4505824725172224.ingest.sentry.io/4505824765018112',
    integrations: [new ProfilingIntegration()],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    environment: process.env.NODE_ENV
  });
}
