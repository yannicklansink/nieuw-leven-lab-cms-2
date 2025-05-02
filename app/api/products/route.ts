import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Simplified Product interface for the homepage
interface HomePageProduct {
  slug: string;
  title: string;
  imageUrl: string;
  omschrijving_kort: string;
  price?: number;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "products.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(jsonData);

    if (Array.isArray(parsedData)) {
      // Select only necessary fields
      const products: HomePageProduct[] = parsedData.map((p: any) => ({
        slug: p.slug,
        title: p.title,
        imageUrl: p.imageUrl,
        omschrijving_kort: p.omschrijving_kort,
        price: p.price,
      }));
      return NextResponse.json(products);
    } else {
      console.error("Error: products.json did not contain a valid array.");
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error reading or parsing products.json:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
