### Preconditions:
Node.js and npm are already installed on your system

### Steps to get started:
Navigate to the project directory and run the following command to install all the required dependencies:npm install

### Important! Addional package install:
Following packages need to be added to package.json in the dependecies, depends on OS used:

Case 1: 64* windwos architecture:
 #@bahmutov/cypress-esbuild-preprocessor": "^2.2.3",
 #@esbuild/win32-x64": "^0.24.0",

Case 2: Lunix:

#"@badeball/cypress-cucumber-preprocessor": "^21.0.2",
    # @bahmutov/cypress-esbuild-preprocessor": "github:bahmutov/cypress-esbuild-preprocessor",

### Steps to get started:
Navigate to the project directory and run the following command to install all the required dependencies:npm install

### Quick start( How run the tests):
To open the Cypress test runner and start running the tests, use the following command: 
#npm run cy:open

### Stopping the tests:
If you need to stop the tests while they are running, go to your terminal and press Ctrl + C to terminate the process

#### Notices:

In the cypress.config.ts file, there's a specific configuration called specPattern that determines which test files format have to be displayed.

- For Cucumber tests: The specPattern is set to */.feature, meaning Cypress will run tests based on the Cucumber .feature files, where scenarios are defined in Gherkin syntax. If your professor wants to run tests with Cucumber, this line should remain active (uncommented).

- For standard Cypress tests: To run tests without Cucumber, you have to select testsuites which have .feature at the end.