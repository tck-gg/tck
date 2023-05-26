import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {}
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    }
  },
  video: false,
  screenshotOnRunFailure: false,
  pageLoadTimeout: 100000,
  requestTimeout: 100000,
  defaultCommandTimeout: 100000,
  responseTimeout: 100000,
  taskTimeout: 100000
});
