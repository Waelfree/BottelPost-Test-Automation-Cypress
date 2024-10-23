
"use strict";

import {Category} from "../Enum/Category";

/**
 * @author Wael Chaouch <waelmok115@gmail.com>
 * @copyright
 */
class Url {
    public static getCategoryNameFromCurrentUrl(): Cypress.Chainable<Category>  {

        return cy.url().then((currentUrl: string) => {
            if (currentUrl.toLowerCase().includes(Category.WATTER.toLowerCase())) {
                return Category.WATTER;
            } else if (currentUrl.toLowerCase().includes(Category.WINE.toLowerCase())) {
                return Category.WINE;
            } else if (currentUrl.toLowerCase().includes(Category.BEER.toLowerCase())) {
                return Category.BEER;
            }

            throw new Error(`Unexpected URL is entered: ${currentUrl}`);
        });
    }
}
export default Url;