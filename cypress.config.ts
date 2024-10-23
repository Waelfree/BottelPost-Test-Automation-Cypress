import { defineConfig } from "cypress";
import { config } from "dotenv";
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import {addCucumberPreprocessorPlugin} from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';

config();
export default defineConfig({
  e2e: {

    // example how prevent flakiness
    // retries: {
    //   runMode: 3, // Maximum retries when running in 'run' mode
    //   openMode: 3 // Set to 0 if you don't want retries in the 'open' mode
    // },

    specPattern: ['**/*.feature', '**/*.cy.ts'],
    baseUrl: process.env.BASE_URL,
    pageLoadTimeout: 60000,

    async setupNodeEvents(on, config) {
      // implement node event listeners here
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
  },
});
