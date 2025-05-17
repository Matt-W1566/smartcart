import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

class ItemSearchAI {
    private gemini: GoogleGenAI;

    constructor(apiKey: string) {
        this.gemini = new GoogleGenAI({ apiKey });
    }

    async getPrices(list: string) {
        const response = await this.gemini.models.generateContent({
            //model: 'gemini-2.5-flash-preview-04-17',
            model: 'gemini-2.0-flash',
            contents: `
            Valid fields for the item names are apple, banana, orange, strawberry, blueberry, grape, watermelon, pineapple, avocado, lemon, lime, mango, peach, pear, raspberry, blackberry, cherry, plum, kiwi, grapefruit, cantaloupe, honeydew melon, tomato, lettuce, spinach, kale, carrot, broccoli, cauliflower, onion, potato, sweet potato, garlic, bell pepper, cucumber, zucchini, eggplant, corn, green bean, pea, asparagus, brussels sprout, celery, mushroom, cabbage, radish, scallion, parsley, cilantro, basil, milk, almond milk, soy milk, oat milk, yogurt, cheese, butter, egg, cream cheese, sour cream, chicken breast, ground beef, steak, chicken thigh, pork chop, ground turkey, sausage, bacon, ham, deli meat, salmon, tuna, shrimp, cod, tilapia, bread, pasta, rice, cereal, oat, flour, sugar, salt, pepper, cooking oil, vinegar, soy sauce, ketchup, mustard, mayonnaise, salad dressing, canned soup

            Valid fields for the stores you will return are zehrs, sobeys, walmart, loblaws, no frills, farm boy, food basics
            
            Response should be nothing but JSON, and should be in the following format and should include all of the aforementioned stores:

            Input: cabbage, ketchup
            Output: 
            {
            "cabbage": {
                "loblaws": {
                "Cabbage - 575g":{
                    "price": 1.99,
                    "is_canadian": true,
                    "is_vegan": true,
                    "is_vegetarian": true,
                    "is_halal": true
                },
                "Cabbage - organic":{
                    "price": 2.99,
                    "is_canadian": true,
                    "is_vegan": true,
                    "is_vegetarian": true,
                    "is_halal": true
                }
                },
                "walmart": {
                "Cabbage - 575g":{
                    "price": 1.99,
                    "is_canadian": false,
                    "is_vegan": true,
                            "is_vegetarian": true,
                            "is_halal": true
                        },
                        "Cabbage - organic":{
                            "price": 2.59,
                            "is_canadian": false,
                            "is_vegan": true,
                            "is_vegetarian": true,
                            "is_halal": true
                        }
                    }
                },
                "ketchup": {
                    "loblaws": {
                        "President's Choice Ketchup":{
                            "price": 4.99,
                            "is_canadian": true,
                            "is_vegan": true,
                            "is_vegetarian": true,
                            "is_halal": true
                        }
                    },
                    "walmart": {
                        "Heinz Ketchup":{
                            "price": 3.99,
                            "is_canadian": false,
                            "is_vegan": true,
                            "is_vegetarian": true,
                            "is_halal": true
                        }
                    }
                }
            }

            Input: ${list}
            Output:
            `
        });
        const text = response.text ?? '{}';
        const cleanedText = text.replace(/```json|```/g, "").trim();
        const prices_dict = JSON.parse(cleanedText);
        return prices_dict;
    }
}

export default ItemSearchAI;

/*EXAMPLE USAGE
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
}
const itemSearch = new ItemSearchAI(GEMINI_API_KEY);
let prices = itemSearch.getPrices("ketchup, apple, banana, orange, pork chop");
*/