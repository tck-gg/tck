import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {}
  },
  video: false,
  screenshotOnRunFailure: false,
  pageLoadTimeout: 100000,
  requestTimeout: 100000,
  defaultCommandTimeout: 100000,
  responseTimeout: 100000,
  taskTimeout: 100000,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  }
});
