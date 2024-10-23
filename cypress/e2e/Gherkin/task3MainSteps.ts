import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import ShoppingCart from '../../support/PageObjects/Components/ShoppingCart';
import {HomePage} from '../../support/PageObjects/Pages/HomePage';

const shoppingCart = new ShoppingCart();
const homePage = new HomePage();

/**
 * @author Wael Chaouch <waelmok115@gmail.com>
 * @copyright
 */
Given('I enter zipecode {string} and I go to the home page', (zipeCode: string) => {
    homePage.navigateToHomeAndCompleteInitialTasks(zipeCode);
});

When('I select the category {string}', (category: string) => {
    cy.contains(category)
        .scrollIntoView({duration: 3000})
        .should('be.visible')
        .click();
    cy.wait(2000);
});

When('I add {int} units of the first product to the cart', (quantity: number) => {
    shoppingCart.addProduct(quantity, 0);
});

Then('the total price should be displayed correctly', () => {
    shoppingCart.getProductPreis(9);
});

When('I check the product price for the {int}th product', (productIndex: number) => {
    shoppingCart.getProductPreis(productIndex);
});

When('I verify the product quantity in the cart', () => {
    shoppingCart.CheckProductQuantity();
});

When('I click on the cart icon', () => {
    shoppingCart.clickOnshoppingCartIcon();
    cy.wait(3000);
});

When('I add {int} unit of the second product to the cart', (quantity: number) => {
    shoppingCart.addProduct(quantity, 1);
});

When('I delete {int} unit of the second product from the cart', (quantity: number) => {
    shoppingCart.deleteProduct(quantity, 1);
});

Then('the total price should be updated correctly in the cart', () => {
    shoppingCart.getProductPriceFromCart();
});

When('I get the delivery fee', () => {
    shoppingCart.getDeliveryFee();
});

When('I open the delivery fee details', () => {
    shoppingCart.clickOnDeliveryFeeLabel();
});

When('I wait for {int} seconds', (seconds: number) => {
    cy.wait(seconds * 1000);
});

Then('I should see the delivery fee information', () => {
    shoppingCart.getDeliveryFeeInfo();
});

When('I close the delivery fee details', () => {
    shoppingCart.elements.deliveryFeeCloser().eq(1).click();
});

Then('the correct delivery fee should be displayed', () => {
    shoppingCart.CheckDeliveryFee();
});