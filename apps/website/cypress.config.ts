import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    },
    specPattern: 'cypress/component/*.cy.tsx'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Setup.
    },
    specPattern: 'cypress/e2e/*.cy.ts'
  },
  video: false,
  screenshotOnRunFailure: false,
  pageLoadTimeout: 100000,
  requestTimeout: 100000,
  defaultCommandTimeout: 100000,
  responseTimeout: 100000,
  taskTimeout: 100000
});
