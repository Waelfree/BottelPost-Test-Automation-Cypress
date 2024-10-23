import ShoppingCart from "../support/PageObjects/Components/ShoppingCart";
import {HomePage} from "../support/PageObjects/Pages/HomePage";
import Url from "../support/Util/Url";
import ApiClient from "../support/Backend/common/ApiClient";

/**
 * @author Wael Chaouch <waelmok115@gmail.com>
 * @copyright
 */
describe("Test: Add to cart", () => {
    let shoppingCart = new ShoppingCart();
    let categories: string[] = ["Bier", "Wasser", "Weine"];
    let homePage: HomePage;

    before(() => {
        // init params
        homePage = new HomePage();
        let apiClient = new ApiClient();

        // init steps
        homePage.navigateToHomeAndCompleteInitialTasks("81369");
        // cy.wrap(apiClient.getFlaschenpostCategories()).then((response) => {
        //     categories = response.results;
        //     cy.then(() => {
        //         expect(categories).to.have.length.greaterThan(0);
        //     });
        // });
        const randomCategory = categories[Math.floor(Math.random() * categories.length)]
        // const category: string = "Wasser"
        cy.contains("Wasser")
            .scrollIntoView({duration: 1000})
            .should("be.visible")
            .click();
    });

    it("Should calculate the total price dynamically based on user click times", () => {

        shoppingCart.addProduct(5, 0);
        shoppingCart.getProductPreis(9);
        shoppingCart.CheckProductQuantity();
        shoppingCart.clickOnshoppingCartIcon();
        cy.wait(3000);
        shoppingCart.addProduct(1, 1);
        shoppingCart.deleteProduct(1, 1);
        shoppingCart.getProductPriceFromCart();
        shoppingCart.getDeliveryFee();
        shoppingCart.clickOnDeliveryFeeLabel();
        cy.wait(2000);
        shoppingCart.getDeliveryFeeInfo();
        shoppingCart.elements.deliveryFeeCloser().eq(1).click();
        shoppingCart.CheckDeliveryFee();
        shoppingCart.CheckPriceFromCheckoutButton();
    });
});