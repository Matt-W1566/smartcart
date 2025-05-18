import { NextRequest, NextResponse } from "next/server";
import PriceOptimizer from "@/app/utils/priceOptimizer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const cart = data.cart;
    console.log("Received cart:", cart);
    const dietary = data.dietary || {};
    
    console.log("Received cart:", JSON.stringify(cart, null, 2));
    console.log("Received dietary preferences:", JSON.stringify(dietary, null, 2));
    
    if (!cart || typeof cart !== "object") {
      return NextResponse.json({ error: "Invalid cart format" }, { status: 400 });
    }

    
    const optimizer = new PriceOptimizer(dietary);
    const result = await optimizer.searchListItems(cart, dietary);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to optimize cart" }, { status: 500 });
  }
}
