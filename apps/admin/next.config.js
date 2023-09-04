const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

const sentryWebpackPluginOptions = {
  org: 'tckgg',
  project: 'tck-admin',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
