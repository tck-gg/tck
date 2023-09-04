import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://eb16c38e49ddefa574938e7f343f9bd1@o4505824725172224.ingest.sentry.io/4505824755515392',
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  environment: process.env.NODE_ENV
});
