"use strict";

/**
 * @author Wael Chaouch <waelmok115@gmail.com>
 * @copyright
 */
export class HomePage implements PageInterface {

    public zipeCodeInputSelector: string = '[id="ion-input-0"]';
    public ionPageSelector: string = '.ion-page';
    public goesClearButtonSelector: string = '.fp_button.fp_button_primary.fp_button_large';
    public title: string  = 'flaschenpost.de - Lebensmittel & Getränke in nur 120 Minuten';

    public elements = {
        ionLayer: (timeout = 0) => cy.get(this.ionPageSelector, {timeout: timeout * 1000}),
        zipeCodeInput: () => cy.get(this.zipeCodeInputSelector),
        goesClearButton: () => cy.get(this.goesClearButtonSelector).as('goesClearBttn')
    }

    public verifyTitle() : void {
        cy.title().should('eq', this.title);
    }

    public navigateToHomeAndCompleteInitialTasks(zipeCode: string) {
        cy.viewport(600, 600);
        this.visitHomePage();
        this.elements.ionLayer(10); //Timeout up to 10 seconds
        this.verifyZipecodeInputIsVisible();
        this.addZipecode(zipeCode);
        this.clickOnGoesClearButton();
        cy.wait(2000);
        this.verifyLandingOnHomePage();
    }

    public addZipecode(value: string): void {
        this.elements.zipeCodeInput().clear;
        this.elements.zipeCodeInput().type(value);
    }

    public clickOnGoesClearButton(): void {
        this.elements.goesClearButton().click();
    }

    public visitHomePage(): void {
        cy.visit('');
    }

    public hasElementVisible(selector: string): void {
        cy.get(selector).should('be.visible');
    }

    public verifyZipecodeInputExisting(Exists: boolean): void {
        cy.verifyElementExists(this.zipeCodeInputSelector, Exists);
    }

    public verifyZipecodeInputIsVisible(): void {
        cy.hasElementVisible(this.zipeCodeInputSelector);
    }

    public verifyLandingOnHomePage(): void {
        cy.url().then((currentUrl: string) => {
            expect(currentUrl).to.equal(Cypress.config('baseUrl'));
        });

        this.verifyZipecodeInputExisting(false);
        this.verifyTitle();
    }

}