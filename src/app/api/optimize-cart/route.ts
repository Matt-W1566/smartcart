import { NextRequest, NextResponse } from "next/server";
import PriceOptimizer from "@/app/utils/priceOptimizer";

export async function POST(req: NextRequest) {
  try {    const data = await req.json();
    const cart = data.cart;
    const dietary = data.dietary || {};
    
    console.log("Received cart:", JSON.stringify(cart, null, 2));
    console.log("Received dietary preferences:", JSON.stringify(dietary, null, 2));
    
    if (!cart || typeof cart !== "object") {
      return NextResponse.json({ error: "Invalid cart format" }, { status: 400 });
    }
      // Ensure all quantities are numeric and at least 1
    const normalizedCart: { [item: string]: number } = {};
    for (const [item, quantity] of Object.entries(cart)) {
      // More robust quantity extraction 
      let numericQuantity: number;
      
      if (typeof quantity === 'number') {
        numericQuantity = quantity;
      } else if (typeof quantity === 'string') {
        numericQuantity = parseInt(quantity, 10);
        if (isNaN(numericQuantity)) numericQuantity = 1;
      } else {
        numericQuantity = 1;
      }
      
      normalizedCart[item] = Math.max(1, numericQuantity);
    }
      console.log("Normalized cart:", JSON.stringify(normalizedCart, null, 2));
    
    const optimizer = new PriceOptimizer(dietary);
    const result = await optimizer.searchListItems(normalizedCart, dietary);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to optimize cart" }, { status: 500 });
  }
}
