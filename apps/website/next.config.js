const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'img.youtube.com',
      'yt3.ggpht.com',
      'static-cdn.jtvnw.net',
      'via.placeholder.com',
      'cdn.tck.gg'
    ]
  },
  sassOptions: {
    includePaths: [__dirname, 'src/styles']
  }
};

const sentryWebpackPluginOptions = {
  org: 'tckgg',
  project: 'tck-website',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
