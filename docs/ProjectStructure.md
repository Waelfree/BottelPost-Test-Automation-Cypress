
### Design Pattern

The design pattern followed is: The Page Object Model (POM)

### Project structure:

The project is organized in a structured way to facilitate both test case management and API request handling. Here’s a breakdown of the different parts:

- e2e: 
This contains the test files. The test cases (such as task2Test.cy.ts) are written in Cypress, and the feature files (like shoppingBasketSteps.feature) define the behavior-driven development (BDD) steps using Cucumber.
Cypress will automatically detect and run tests from this folder.

- support (Optional): This directory is used for storing various support files. You can include custom commands, global variables, or other scripts that you want to load before running your tests.
  - Backend: This is where API requests are handled. These requests interact with the Flaschenpost website to fetch categories .
  - PageObjects: All page elements are stored in those directory. This makes it easy to access and update page / elements as needed, especially when there are changes in the front end (or UI) of the website.
    - Components: It holds specific components like Card.ts for task-related items like the cart component.
    - Pages: This includes page-specific objects like HomePage.ts, which defines interactions on the home page of Flaschenpost.de.
  - docs: Contains documentation, such as README.md files, which explain how to set up and run the project.

### Configuration Files:
cucumber.config.ts and cypress.config.ts: These files contain the configuration for both Cucumber and Cypress, specifying things like timeouts, feature patterns, and base URLs.
package.json: Located at the root of the project, this file lists all the packages and dependencies being used, such as Cypress, Cucumber, and any other relevant libraries for testing and development.