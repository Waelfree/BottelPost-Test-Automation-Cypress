"use strict";

import * as cypress from "cypress";
import {ApiClient, BottelpostCategoryResponse} from "../type";

/**
 * @author Wael Chaouch <waelmok115@gmail.com>
 * @copyright
 */
class BackendApiClient implements ApiClient {

    public constructor(
        public readonly routes: any = {
            categoryList: () => `elastic-query-portal/46/v2/categories`,
        },
    ) {}


    public getFlaschenpostCategories(): Promise<BottelpostCategoryResponse> {

        return this.request(this.routes.categoryList());
    }

    public async request(url: string): Promise<any> {

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('HTTP error! Status' + response.status);
            }

            return await response.json();

        } catch (error) {
            throw new Error('Request failed' + error);
        }
    }

}

export default BackendApiClient;