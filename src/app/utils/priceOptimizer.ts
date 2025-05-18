import ItemSearchAI from './itemSearch.ts';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const itemSearch = new ItemSearchAI(GEMINI_API_KEY);
console.log(itemSearch.getPrices("cheese, bread, butter, ketchup"));
type PricesType = Record<string, Record<string, Record<string, { price: number }>>>;

function getAllStores(prices: PricesType): string[] {
    const storeSet = new Set<string>();
    for (const item of Object.values(prices)) {
        for (const store of Object.keys(item)) {
            storeSet.add(store);
        }
    }
    return Array.from(storeSet);
}

const __dirname = "C:\\Users\\aryam\\Documents\\smartcart\\src\\app\\utils";

function getCheapestSingleStore(prices: PricesType) {
    const stores = getAllStores(prices);
    let minTotal = Infinity;
    let minStore = '';
    let storeItems: Record<string, string> = {};
    let storeBreakdown: { items: { name: string, product: string, price: number }[], total: number } = { items: [], total: 0 };
    for (const store of stores) {
        let total = 0;
        let valid = true;
        let items: Record<string, string> = {};
        let breakdown: { name: string, product: string, price: number }[] = [];
        for (const itemName of Object.keys(prices)) {
            const itemStores = prices[itemName];
            if (itemStores[store]) {
                // Pick the cheapest product for this item in this store
                let minProduct = '';
                let minProductPrice = Infinity;
                for (const productName of Object.keys(itemStores[store])) {
                    const product = itemStores[store][productName];
                    if (product.price < minProductPrice) {
                        minProductPrice = product.price;
                        minProduct = productName;
                    }
                }
                total += minProductPrice;
                items[itemName] = minProduct;
                breakdown.push({ name: itemName, product: minProduct, price: minProductPrice });
            } else {
                valid = false;
                break;
            }
        }
        if (valid && total < minTotal) {
            minTotal = total;
            minStore = store;
            storeItems = items;
            storeBreakdown = { items: breakdown, total };
        }
    }
    return {
        store: minStore,
        total: minTotal,
        items: storeItems,
        breakdown: {
            [minStore]: storeBreakdown
        }
    };
}

function combinations(arr: string[], n: number): string[][] {
    if (n > arr.length) return [];
    if (n === 1) return arr.map(x => [x]);
    const result: string[][] = [];
    arr.forEach((curr, idx) => {
        combinations(arr.slice(idx + 1), n - 1).forEach(rest => {
            result.push([curr, ...rest]);
        });
    });
    return result;
}

function getCheapestNSplitStores(prices: PricesType, n: number) {
    const stores = getAllStores(prices);
    const storeCombos = combinations(stores, n);
    let minTotal = Infinity;
    let minCombo: string[] = [];
    let comboItems: Record<string, { store: string, product: string, price: number }> = {};
    let comboBreakdown: Record<string, { store: string, product: string, price: number }> = {};
    let foundValid = false;
    for (const combo of storeCombos) {
        if (combo.length !== n) continue;
        let total = 0;
        let items: Record<string, { store: string, product: string, price: number }> = {};
        let usedStores = new Set<string>();
        for (const itemName of Object.keys(prices)) {
            let found = false;
            let minProduct = '';
            let minProductPrice = Infinity;
            let minStore = '';
            for (const store of combo) {
                const itemStores = prices[itemName];
                if (itemStores[store]) {
                    for (const productName of Object.keys(itemStores[store])) {
                        const product = itemStores[store][productName];
                        if (product.price < minProductPrice) {
                            minProductPrice = product.price;
                            minProduct = productName;
                            minStore = store;
                            found = true;
                        }
                    }
                }
            }
            if (found) {
                total += minProductPrice;
                items[itemName] = { store: minStore, product: minProduct, price: minProductPrice };
                usedStores.add(minStore);
            }
        }
        // Only consider combos with at least one item and all n stores used
        if (Object.keys(items).length > 0 && usedStores.size === n && total < minTotal) {
            minTotal = total;
            minCombo = combo;
            comboItems = items;
            foundValid = true;
        }
    }
    // If no valid combo, return empty result (should only happen if prices is empty)
    if (!foundValid) {
        return { total: 0, items: {}, breakdown: {} };
    }
    // Group items by store for breakdown
    const breakdown: Record<string, { items: { name: string, product: string, price: number }[], total: number }> = {};
    for (const [item, detail] of Object.entries(comboItems)) {
        if (!breakdown[detail.store]) {
            breakdown[detail.store] = { items: [], total: 0 };
        }
        breakdown[detail.store].items.push({ name: item, product: detail.product, price: detail.price });
        breakdown[detail.store].total += detail.price;
    }
    return { total: minTotal, items: comboItems, breakdown };
}

function getHighestSingleStore(prices: PricesType) {
    const stores = getAllStores(prices);
    let maxTotal = -Infinity;
    let maxStore = '';
    let storeItems: Record<string, string> = {};
    let storeBreakdown: { items: { name: string, product: string, price: number }[], total: number } = { items: [], total: 0 };
    for (const store of stores) {
        let total = 0;
        let valid = true;
        let items: Record<string, string> = {};
        let breakdown: { name: string, product: string, price: number }[] = [];
        for (const itemName of Object.keys(prices)) {
            const itemStores = prices[itemName];
            if (itemStores[store]) {
                // Pick the most expensive product for this item in this store
                let maxProduct = '';
                let maxProductPrice = -Infinity;
                for (const productName of Object.keys(itemStores[store])) {
                    const product = itemStores[store][productName];
                    if (product.price > maxProductPrice) {
                        maxProductPrice = product.price;
                        maxProduct = productName;
                    }
                }
                total += maxProductPrice;
                items[itemName] = maxProduct;
                breakdown.push({ name: itemName, product: maxProduct, price: maxProductPrice });
            } else {
                valid = false;
                break;
            }
        }
        if (valid && total > maxTotal) {
            maxTotal = total;
            maxStore = store;
            storeItems = items;
            storeBreakdown = { items: breakdown, total };
        }
    }
    if (maxStore === '') {
        return null;
    }
    return {
        store: maxStore,
        total: maxTotal,
        items: storeItems,
        breakdown: {
            [maxStore]: storeBreakdown
        }
    };
}

async function search_list_items() {
    const pricesData = await itemSearch.getPrices("cheese, bread, butter, ketchup");
    if (!pricesData) {
        console.error("No prices returned from getPrices.");
        return;
    }
    console.log("Prices result:", pricesData);
    
    // Save prices data to a local JSON file
    
    try {
        const filePath = path.resolve(__dirname, 'prices.json');
        fs.writeFileSync(filePath, JSON.stringify(pricesData, null, 2), 'utf8');
        console.log(`Price data saved to ${filePath}`);
    } catch (error) {
        console.error("Error saving prices data to file:", error);
    }
    // Save prices data to a local JSON file in the same directory as this script
    try {
        const filePath = path.join(__dirname, 'prices.json');
        fs.writeFileSync(filePath, JSON.stringify(pricesData, null, 2), 'utf8');
        console.log(`Price data saved to ${filePath}`);
    } catch (error) {
        console.error("Error saving prices data to file:", error);
    }

    // Cast the JSON data to our expected PricesType
    const prices = pricesData as unknown as PricesType;

    // Cheapest single store
    const cheapest1 = getCheapestSingleStore(prices);
    // Cheapest 2-store split
    const cheapest2 = getCheapestNSplitStores(prices, 2);
    // Cheapest 3-store split
    const cheapest3 = getCheapestNSplitStores(prices, 3);
    // Highest possible price in one store
    const highest = getHighestSingleStore(prices);

    // Output in a parsable format (JSON)
    const result = {
        cheapest_single_store: cheapest1,
        cheapest_two_stores: cheapest2,
        cheapest_three_stores: cheapest3,
        highest_single_store: highest
    };
    console.log(JSON.stringify(result, null, 2));
}
search_list_items();