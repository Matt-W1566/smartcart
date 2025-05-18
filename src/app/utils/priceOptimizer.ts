import ItemSearchAI from './itemSearch.ts';
import 'dotenv/config';

type PricesType = Record<string, Record<string, Record<string, { price: number }>>>;

interface DietaryPreferences {
    is_canadian?: boolean;
    is_vegan?: boolean;
    is_vegetarian?: boolean;
    is_halal?: boolean;
    gluten_free?: boolean;
    is_kosher?: boolean;
    dairy_free?: boolean;
}

class PriceOptimizer {
    private itemSearch: ItemSearchAI;
    private dietary: DietaryPreferences;

    constructor(dietary: DietaryPreferences = {}) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY environment variable is not set.");
        }
        this.itemSearch = new ItemSearchAI(apiKey);
        this.dietary = dietary;
    }

    private getAllStores(prices: PricesType): string[] {
        const storeSet = new Set<string>();
        for (const item of Object.values(prices)) {
            for (const store of Object.keys(item)) {
                storeSet.add(store);
            }
        }
        return Array.from(storeSet);
    }

    private combinations(arr: string[], n: number): string[][] {
        if (n > arr.length) return [];
        if (n === 1) return arr.map(x => [x]);
        const result: string[][] = [];
        arr.forEach((curr, idx) => {
            this.combinations(arr.slice(idx + 1), n - 1).forEach(rest => {
                result.push([curr, ...rest]);
            });
        });
        return result;
    }    public getCheapestSingleStore(prices: PricesType, cart: { [item: string]: number }) {
        const stores = this.getAllStores(prices);
        let minTotal = Infinity;
        let minStore = '';
        let storeItems: Record<string, string> = {};
        let storeBreakdown: { items: { name: string, product: string, price: number, quantity: number, subtotal: number }[], total: number } = { items: [], total: 0 };
        
        for (const store of stores) {
            let total = 0;
            let valid = true;
            let items: Record<string, string> = {};
            let breakdown: { name: string, product: string, price: number, quantity: number, subtotal: number }[] = [];
              for (const itemName of Object.keys(prices)) {
                const itemStores = prices[itemName];                // Get the actual quantity from the cart, ensuring it's at least 1
                const quantity = cart[itemName] ? Math.max(1, parseInt(String(cart[itemName]))) : 1;
                console.log(`Processing item ${itemName} with quantity ${quantity} (original: ${cart[itemName]})`);
                
                if (itemStores[store]) {
                    let minProduct = '';
                    let minProductPrice = Infinity;
                    for (const productName of Object.keys(itemStores[store])) {
                        const product = itemStores[store][productName];
                        if (product.price < minProductPrice) {
                            minProductPrice = product.price;
                            minProduct = productName;
                        }
                    }
                    total += minProductPrice * quantity;
                    items[itemName] = minProduct;
                    breakdown.push({ 
                        name: itemName, 
                        product: minProduct, 
                        price: minProductPrice, 
                        quantity, 
                        subtotal: minProductPrice * quantity 
                    });                } else {
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

    public getCheapestNSplitStores(prices: PricesType, n: number, cart: { [item: string]: number }) {
        const stores = this.getAllStores(prices);
        const storeCombos = this.combinations(stores, n);
        let minTotal = Infinity;
        let minCombo: string[] = [];
        let comboItems: Record<string, { store: string, product: string, price: number, quantity: number, subtotal: number }> = {};
        let foundValid = false;
        for (const combo of storeCombos) {
            if (combo.length !== n) continue;
            let total = 0;
            let items: Record<string, { store: string, product: string, price: number, quantity: number, subtotal: number }> = {};
            let usedStores = new Set<string>();
            for (const itemName of Object.keys(prices)) {                let found = false;
                let minProduct = '';
                let minProductPrice = Infinity;
                let minStore = '';                // Ensure we get a valid numeric quantity with a fallback to 1
                const quantity = cart[itemName] ? Math.max(1, parseInt(String(cart[itemName]))) : 1;
                console.log(`N-split item ${itemName} with quantity ${quantity} (original: ${cart[itemName]})`);
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
                    total += minProductPrice * quantity;
                    items[itemName] = { store: minStore, product: minProduct, price: minProductPrice, quantity, subtotal: minProductPrice * quantity };
                    usedStores.add(minStore);
                }
            }
            if (Object.keys(items).length > 0 && usedStores.size === n && total < minTotal) {
                minTotal = total;
                minCombo = combo;
                comboItems = items;
                foundValid = true;
            }
        }
        if (!foundValid) {
            return { total: 0, items: {}, breakdown: {} };
        }
        const breakdown: Record<string, { items: { name: string, product: string, price: number, quantity: number, subtotal: number }[], total: number }> = {};
        for (const [item, detail] of Object.entries(comboItems)) {
            if (!breakdown[detail.store]) {
                breakdown[detail.store] = { items: [], total: 0 };
            }
            breakdown[detail.store].items.push({ name: item, product: detail.product, price: detail.price, quantity: detail.quantity, subtotal: detail.subtotal });
            breakdown[detail.store].total += detail.subtotal;
        }
        return { total: minTotal, items: comboItems, breakdown };
    }

    public getHighestSingleStore(prices: PricesType, cart: { [item: string]: number }) {
        const stores = this.getAllStores(prices);
        let maxTotal = -Infinity;
        let maxStore = '';
        let storeItems: Record<string, string> = {};
        let storeBreakdown: { items: { name: string, product: string, price: number, quantity: number, subtotal: number }[], total: number } = { items: [], total: 0 };
        for (const store of stores) {
            let total = 0;
            let valid = true;
            let items: Record<string, string> = {};
            let breakdown: { name: string, product: string, price: number, quantity: number, subtotal: number }[] = [];
            for (const itemName of Object.keys(prices)) {
                const itemStores = prices[itemName];
                const quantity = cart[itemName] ? Math.max(1, parseInt(String(cart[itemName]))) : 1;
                if (itemStores[store]) {
                    let maxProduct = '';
                    let maxProductPrice = -Infinity;
                    for (const productName of Object.keys(itemStores[store])) {
                        const product = itemStores[store][productName];
                        if (product.price > maxProductPrice) {
                            maxProductPrice = product.price;
                            maxProduct = productName;
                        }
                    }
                    total += maxProductPrice * quantity;
                    items[itemName] = maxProduct;
                    breakdown.push({ name: itemName, product: maxProduct, price: maxProductPrice, quantity, subtotal: maxProductPrice * quantity });
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
    }    public async searchListItems(cart: { [item: string]: number }, dietary: DietaryPreferences = this.dietary) {
        // Extract just the item names for the API query
        let items = Object.keys(cart).join(', ');
        console.log("Cart items with quantities:", JSON.stringify(cart, null, 2));
        
        const pricesData = await this.itemSearch.getPrices(
            items,
            dietary['is_canadian'],
            dietary['is_vegan'],
            dietary['is_vegetarian'],
            dietary['is_halal'],
            dietary['gluten_free'],
            dietary['is_kosher'],
            dietary['dairy_free']
        );
        if (!pricesData) {
            console.error("No prices returned from getPrices.");
            return;
        }
        const prices = pricesData as unknown as PricesType;
        const cheapest1 = this.getCheapestSingleStore(prices, cart);
        const cheapest2 = this.getCheapestNSplitStores(prices, 2, cart);
        const cheapest3 = this.getCheapestNSplitStores(prices, 3, cart);
        const highest = this.getHighestSingleStore(prices, cart);
        const result = {
            cheapest_single_store: cheapest1,
            cheapest_two_stores: cheapest2,
            cheapest_three_stores: cheapest3,
            highest_single_store: highest
        };
        return result;
    }
}

export default PriceOptimizer;