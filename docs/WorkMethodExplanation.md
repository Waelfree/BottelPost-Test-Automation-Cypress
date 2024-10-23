I have configured the tests to ensure they run in a stable and reliable manner. One key aspect is that I have implemented global retry configurations to automatically repeat tests up to three times if they fail due to transient issues. This minimizes the risk of tests failing because of temporary problems.

- To avoid flakiness, I took measures to ensure that the tests interact only when the necessary elements are visible and available. Using synchronization methods, ensures that all relevant elements are loaded on the page before proceeding with the test. Additionally, I made sure that tests wait for network responses before performing further actions, which enhances the overall stability of the test suite.
  - Example Code: this should be added in cypress.config.js
    - module.exports = {
      e2e: {
      // other configuration options...
      retries: {
      runMode: 3, // Maximum retries when running in 'run' mode
      openMode: 0 // Set to 0 if you don't want retries in the 'open' mode
      }
      }
      };


Furthermore, I employed before hooks to guarantee that each test run starts on the homepage and that the page is fully loaded before any subsequent steps are executed. This ensures that all tests begin from a consistent starting point and do not have unnecessary dependencies on the outcomes of previous test cases.

For Task 3, I created a Cucumber feature file that incorporates both Task 1 and Task 2, ensuring a seamless flow of tests. The feature file is well-structured, outlining all the required steps clearly, including scenarios like dynamic price updates when adding or removing products. I used Cypress, Cucumber, and the Page Object Model (POM) to maintain clean and modular code, ensuring that each functionality is separated logically for easier maintenance.

## NOTE:

- Test 2 and 3 for the test case of wine and beer are not trustworthy because the CSS selector changes every time for elements I want to interact with. (this is the main problem i had)
  - Suggestion for it: the selectors need to be unique (each element we want to interact with should have unique id)