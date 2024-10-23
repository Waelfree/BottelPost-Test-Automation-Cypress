/// <reference types="cypress" />
// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * @author Wael Chaouch <waelmok115@gmail.com>
 * @copyright
 */
Cypress.Commands.add('verifyElementExists', (selector: string, exists: boolean): void => {

    if (exists) {
        cy.get(selector).should('exist')
    } else {
        cy.get(selector).should('not.exist')
    }
});

Cypress.Commands.add('hasElementVisible', (selector: string): void => {
    cy.get(selector).should('be.visible');
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false to prevent Cypress from
    // failing the test on uncaught exceptions
    return false;
});