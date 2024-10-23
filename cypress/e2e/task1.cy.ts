import {HomePage}  from "../support/PageObjects/Pages/HomePage";

/**
 * @author Wael Chaouch <waelmok115@gmail.com>
 * @copyright
 */
describe("Test: Add zipecode and go to home page by clicking on goes clear button", () => {
    let homePage: HomePage;

    before(() => {
        //init params
        homePage = new HomePage();

        //init steps
        cy.viewport(600, 600);
    });

    it("Should add zipecode and go tm home page ", () => {

        homePage.visitHomePage();
        homePage.elements.ionLayer(10); //Timeout up to 10 seconds
        homePage.verifyZipecodeInputIsVisible();
        homePage.addZipecode("81369");
        homePage.clickOnGoesClearButton();
        cy.wait(2000);
        homePage.verifyLandingOnHomePage();
    });
});