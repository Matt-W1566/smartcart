//import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';
//dotenv.config();
class ItemSearchAI {
    private gemini: GoogleGenAI;

    constructor(apiKey: string) {
        this.gemini = new GoogleGenAI({ apiKey });
    }
    async photoParse(photoPath: string): Promise<string> {
        const imageData = fs.readFileSync(photoPath);
        const response = await this.gemini.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [{
                role: 'user',
                parts: [
                    {text: `
                    Provide a comma separated list of items in the recipe for the provided image dish in the following format:
                    apple, pea, sprout

                    *They should be in singular form and not plural.*
                    *They should be in lowercase.*
                    `},
                    {
                        inlineData: {
                            mimeType: 'image/jpeg',
                            data: imageData.toString('base64')
                        }
                    }
                ]
            }]
        });
        const text = response.text ?? '';
        return text;
    }
    async getPrices(
        list: string,
        is_canadian: boolean = false,
        is_vegan: boolean = false,
        is_vegetarian: boolean = false,
        is_halal: boolean = false,
        gluten_free: boolean = false
    ): Promise<JSON> {
        const response = await this.gemini.models.generateContent({
            model: 'gemini-2.0-flash-lite',
            contents: `
            Valid fields for the item names are apple, banana, orange, strawberry, blueberry, grape, watermelon, pineapple, avocado, lemon, lime, mango, peach, pear, raspberry, blackberry, cherry, plum, kiwi, grapefruit, cantaloupe, honeydew melon, tomato, lettuce, spinach, kale, carrot, broccoli, cauliflower, onion, potato, sweet potato, garlic, bell pepper, cucumber, zucchini, eggplant, corn, green bean, pea, asparagus, brussels sprout, celery, mushroom, cabbage, radish, scallion, parsley, cilantro, basil, milk, almond milk, soy milk, oat milk, yogurt, cheese, butter, egg, cream cheese, sour cream, chicken breast, ground beef, steak, chicken thigh, pork chop, ground turkey, sausage, bacon, ham, deli meat, salmon, tuna, shrimp, cod, tilapia, bread, pasta, rice, cereal, oat, flour, sugar, salt, pepper, cooking oil, vinegar, soy sauce, ketchup, mustard, mayonnaise, salad dressing, canned soup

            Valid fields for the stores you will return are loblaws, no frills, sobeys, freshco, metro, food basics, walmart, longos(must return each of these stores)
            
            Response should be nothing but JSON, and should be in the following format and should include all of the aforementioned stores:
            Only include products that match these filters(ignore if set to false):
            is_canadian: ${is_canadian}
            is_vegan: ${is_vegan}
            is_vegetarian: ${is_vegetarian}
            is_halal: ${is_halal}
            gluten_free: ${gluten_free}

            Sample(do at least 2 choices per store):

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
                "is_halal": true,
                "gluten_free": true
            },
            "Cabbage - organic":{
                "price": 2.99,
                "is_canadian": true,
                "is_vegan": true,
                "is_vegetarian": true,
                "is_halal": true,
                "gluten_free": true
            }
            },
            "walmart": {
            "Cabbage - 575g":{
                "price": 1.99,
                "is_canadian": false,
                "is_vegan": true,
                "is_vegetarian": true,
                "is_halal": true,
                "gluten_free": true
            },
            "Cabbage - organic":{
                "price": 2.59,
                "is_canadian": false,
                "is_vegan": true,
                "is_vegetarian": true,
                "is_halal": true,
                "gluten_free": true
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
                "is_halal": true,
                "gluten_free": true
                }
            },
            "walmart": {
                "Heinz Ketchup":{
                "price": 3.99,
                "is_canadian": false,
                "is_vegan": true,
                "is_vegetarian": true,
                "is_halal": true,
                "gluten_free": true
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
        const prices_dict: JSON = JSON.parse(cleanedText);
        return prices_dict;
    }
}

export default ItemSearchAI;

//EXAMPLE USAGE

/*const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
}
const itemSearch = new ItemSearchAI(GEMINI_API_KEY);
//let prices = itemSearch.getPrices("ketchup, apple, banana, orange, pork chop");

async function main() {
    const items = await itemSearch.photoParse("src/app/utils/test.jpg");
    console.log(items);
}

main();*/