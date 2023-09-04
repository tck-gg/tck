import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://a52da015df4fc2ecdc0c92da84e04f02@o4505824725172224.ingest.sentry.io/4505824732774400',
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV
});
