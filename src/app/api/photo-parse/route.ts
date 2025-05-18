import { NextRequest, NextResponse } from "next/server";
import ItemSearchAI from "@/app/utils/itemSearch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
  }

  const itemSearch = new ItemSearchAI(GEMINI_API_KEY);
  const data = await req.json();
  const { imageBase64 } = data;

  try {
    const fs = require("fs");
    const path = require("path");
    const tempPath = path.join(process.cwd(), "temp_upload.jpg");
    fs.writeFileSync(tempPath, Buffer.from(imageBase64, "base64"));
    const items = await itemSearch.photoParse(tempPath);
    fs.unlinkSync(tempPath);
    return NextResponse.json({ items });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to parse image";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
