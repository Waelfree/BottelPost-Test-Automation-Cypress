"use strict";

/**
 * @author Wael Chaouch <waelmok115@gmail.com>
 * @copyright
 */
export type ApiClient = {
    getFlaschenpostCategories: () => Promise<BottelpostCategoryResponse>
}

export type BottelpostCategoryResponse = {
    info: {
        needed: number;
        indexUsed: string;
        lastUpdatedForWarehouse: string;
        updated: string;
    };
    alerts: any[];
    warnings: any[];
    page: {
        current: number;
        totalPages: number;
        totalResults: number;
        size: number;
    };
    results: Category[];
}

export type SubCategory = {
    idSubCategory: number;
    name: string;
    isVisible: boolean;
    webShopUrl: string;
    sort: number;
    frontendDisplayType: number;
    displayName: string;
}

export type Category = {
    id: string;
    sortPim: number;
    isVisible: boolean;
    imageUrl: string;
    idCategory: number;
    upsert: string;
    type: string;
    displayName: string;
    webShopUrl: string;
    subCategories: SubCategory[];
}