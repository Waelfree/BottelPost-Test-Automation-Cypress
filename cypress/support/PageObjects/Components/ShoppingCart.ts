"use strict";

import "cypress-xpath";
import {Category} from "../../Enum/Category";
import Url from "../../Util/Url";

/**
 * @author Wael Chaouch <waelmok115@gmail.com>
 * @copyright
 */
class ShoppingCart {

    private clickCount: number = 0;
    private ProductPrice: number = 0;

    // selectors
    private cardIconSelector: string = 'ion-icon.btn_svg_icon';
    private deliveryFeeLabelSelector: string = '[data-testid="nI3uw38XOal1G80KVLDB4"]';
    private deliveryFeeCloserSelector: string = '[data-testid="mUf3ObIoG5XikpImydYsQ"]';
    private firstProductSelector: string = '';
    private freeDeliverySelector = '[data-testid="l16GYN4WDxG5z_Vcc1qug"]';
    private specificDeliverySelector = '[data-testid="7IPyhhV_yTnlYpAltK7T7"]';

    public elements = {
        cardIcon: (timeout = 0) => cy.get(this.cardIconSelector, {timeout: timeout * 1000}),
        deliveryFeeLabel: () => cy.get(this.deliveryFeeLabelSelector),
        deliveryFeeCloser: () => cy.get(this.deliveryFeeCloserSelector),
        productButton: () => cy.get(this.firstProductSelector),
    };

    public clickOnshoppingCartIcon(): void {
        this.elements.cardIcon().click();
    }

    public clickOnDeliveryFeeLabel(): void {
        this.elements.deliveryFeeLabel().click();
    }

    public generateXpathProductWithIndex(index: number): string {
        return (
            '((//div[@class="product"])[' +
            index +
            "])/a/div/div[3]/div/div/div[2]/div/div[2]/div/div[2]"
        );
    }

    public getProductPreis(index: number): number {
        let ProductPreis = 0;
        cy.xpath(this.generateXpathProductWithIndex(index))
            .invoke("text")
            .then((preis) => {
                ProductPreis = parseFloat(
                    preis.replace(",", ".").replace("€", "").trim()
                );
                cy.log(`The price is: ${ProductPreis} €`);
            });

        return ProductPreis;
    }

    public deleteProduct(ClickNumber: number, index: number): void {
        for (let i = 1; i <= ClickNumber; i++) {
            const deleteProductBtn = '[data-testid="khR4wDZUz5RYcR1D7xy2Y"]';

            cy.get(deleteProductBtn).eq(index).click();

            if (this.clickCount > 0) {
                this.clickCount -= 1;
            }

            cy.wait(1000);
        }
    }

    public addProduct(ClickNumber: number, index: number): void {

        Url.getCategoryNameFromCurrentUrl().then((category) => {
            this.firstProductSelector = this.getProductXpathByCategory(category);

            for (let i = 1; i <= ClickNumber; i++) {
                // this.elements.productButton().scrollIntoView({duration: 50000})
                this.elements.productButton().eq(index).click();
                this.clickCount += 1;
                cy.wait(1000);
            }
        });

    }

    private getProductXpathByCategory(category: Category): string {

        switch (category) {
            case Category.WATTER:
                return 'button[data-testid="MvQuUg-R9xjMRIy5KtRz8|6717"]';
            case Category.BEER:
                return 'button[data-testid="MvQuUg-R9xjMRIy5KtRz8|7029"]'
            case Category.WINE:
                return 'button[data-testid="MvQuUg-R9xjMRIy5KtRz8|650"]';
            default:
                throw new Error(`Unexpected category is given: ${category}`);
        }

    }

    public getProductPriceFromCart(): number {
        const ProductPriceTestId = '[data-testid="zQd3zSar3oEiHdzHbu3bF"]';
        cy.get(ProductPriceTestId)
            .invoke("text")
            .then((price) => {
                this.ProductPrice = parseFloat(
                    price.replace("€", "").replace(",", ".").trim()
                );
                cy.log(`The Total product price is ${this.ProductPrice} in the cart.`);
            });

        return this.ProductPrice;
    }

    public CheckProductQuantity(): void {
        const CARtQuantityTestId = '[data-testid="_d9MZiqJtHrFpYleKjj8B"]';
        cy
            .get(CARtQuantityTestId)
            .invoke("text")
            .then((quantity) => {
                const cartQuantity = parseInt(quantity.trim(), 10);
                const expectedQuantity = this.clickCount;
                cy.log(`Expected product quantity: ${expectedQuantity}, Cart quantity: ${cartQuantity}`);
                expect(cartQuantity).to.equal(expectedQuantity);
                //return cy.wrap(cartQuantity);
            });
    }

    public getDeliveryFee(): Cypress.Chainable<number> {

        return cy.get("body").then((body) => {
            if (body.find(this.freeDeliverySelector).length > 0) {
                return cy
                    .get(this.freeDeliverySelector)
                    .invoke("text")
                    .then((deliveryFee) => {
                        cy.log("The delivery fee is: ", deliveryFee);
                        return cy.wrap(0);
                    });
            } else if (body.find(this.specificDeliverySelector).length > 0) {
                return cy
                    .get(this.specificDeliverySelector)
                    .invoke("text")
                    .then((deliveryFee) => {
                        const deliveryFeeParsed = parseFloat(
                            deliveryFee.replace("€", "").replace(",", ".").trim()
                        );
                        cy.log("The delivery fee in the cart: ", deliveryFeeParsed);
                        return cy.wrap(deliveryFeeParsed);
                    });
            } else {
                cy.log("The delivery fee in the cart could not be found");
                return cy.wrap(0);
            }
        });
    }

    public getDeliveryFeeInfo(): Cypress.Chainable<number> {
        const DeliveryFeeTableSelector: string = ".tw-co-grid.tw-co-grid-cols-2";

        let deliveryFeeTable: Array<{
            minOrderAmount: number;
            deliveryFee: number;
        }> = [];

        return cy
            .get(DeliveryFeeTableSelector)
            .each(($el) => {
                // Extract the minimum order amount
                cy.wrap($el)
                    .find("span")
                    .first()
                    .invoke("text")
                    .then((orderAmount) => {
                        const minOrderAmount = parseFloat(
                            orderAmount.replace("ab", "").replace("€", "").trim()
                        );

                        // Extract the delivery fee
                        cy.wrap($el)
                            .find("span")
                            .last()
                            .invoke("text")
                            .then((fee) => {
                                let deliveryFee: number;

                                if (fee.trim() === "kostenlos") {
                                    deliveryFee = 0;
                                } else {
                                    deliveryFee = parseFloat(
                                        fee.replace(",", ".").replace("€", "").trim()
                                    );
                                }

                                deliveryFeeTable.push({minOrderAmount, deliveryFee});
                            });
                    });
            })
            .then(() => {
                cy.log(`The delivery fee table is: ${JSON.stringify(deliveryFeeTable)}`);

                let expectedDeliveryFee: number | null = null;

                for (const entry of deliveryFeeTable) {
                    if (this.ProductPrice >= entry.minOrderAmount) {
                        expectedDeliveryFee = entry.deliveryFee;
                    }
                }

                this.getDeliveryFee().then((deliveryFee) => {
                    expect(expectedDeliveryFee).to.equal(deliveryFee);
                });

                if (expectedDeliveryFee !== null) {
                    cy.log(`The matching delivery fee from the table is: ${expectedDeliveryFee}`);
                    return cy.wrap(expectedDeliveryFee);
                } else {
                    cy.log("No matching delivery fee found in the table.");
                    return cy.wrap(0);
                }
            });
    }

    public CheckDeliveryFee(): void {
        this.getDeliveryFeeInfo().then((expectedDeliveryFee) => {
            this.getDeliveryFee().then((actuelLiefergebuehr) => {
                // Vergleiche die beiden Werte
                if (expectedDeliveryFee === actuelLiefergebuehr) {
                    cy.log(
                        "The current delivery fee in the cart matches the expected delivery fee from the info table"
                    );
                } else {
                    throw new Error(
                        "The current delivery fee in the cart does not match the expected delivery fee from the info table"
                    );
                }
            });
        });
    }

    // Label: Zur Kasse
    public CheckPriceFromCheckoutButton(): void {
        cy.get('div.tw-co-text-right')
            .find('span')
            .invoke('text')
            .then((price) => {
                const totalPrice = parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.'));
                expect(totalPrice, `The price from the button to the payment is displayed correctly: ${this.ProductPrice}, but got: ${totalPrice}`)
                    .to.equal(this.ProductPrice);
            });
    }
}

export default ShoppingCart;