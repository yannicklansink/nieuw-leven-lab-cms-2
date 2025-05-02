import fs from "fs/promises";
import path from "path";
import React from "react";
import ProductCard from "@/components/elements/ProductCard"; // Import the reusable card
import Button from "@/components/elements/Button"; // Import Button
import { UserCheck, FileText, ShieldCheck } from "lucide-react"; // Import icons

// Define the product interface (consistent with other uses)
// Consider moving this to a shared types file (e.g., types/index.ts) in the future
interface HomePageProduct {
  slug: string;
  title: string;
  imageUrl: string;
  omschrijving_kort: string;
  price?: number;
}

// Fetch product data on the server
async function getAllProducts(): Promise<HomePageProduct[]> {
  const filePath = path.join(process.cwd(), "data", "products.json");
  try {
    const jsonData = await fs.readFile(filePath, "utf-8");
    const productsData = JSON.parse(jsonData);

    // Basic validation
    if (!Array.isArray(productsData)) {
      console.error("Error: products.json does not contain a valid array.");
      return [];
    }

    // Map to the simplified structure if needed (ensure consistency with API route)
    return productsData.map((p: any) => ({
      slug: p.slug,
      title: p.title, // Assuming JSON has 'title', adjust if needed (e.g., p.titel)
      imageUrl: p.imageUrl,
      omschrijving_kort: p.omschrijving_kort,
      price: p.price,
    }));
  } catch (error) {
    console.error("Error reading or parsing products.json:", error);
    return []; // Return empty array on error
  }
}

// Shop Page Component (Server Component)
export default async function BloedtestenShopPage() {
  const products = await getAllProducts();

  return (
    <main className="content-container py-12">
      {/* New Header Section based on image */}
      <section className="mb-16 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column: Text and Button */}
          <div className="flex flex-col items-start">
            <h1
              className="text-3xl lg:text-4xl font-geist-bold leading-tight"
              style={{ color: "rgb(var(--color-black-headings-and-buttons))" }}
            >
              Shop alle bloedtesten
            </h1>
            <p style={{ color: "rgb(var(--color-paragraaf))" }}>
              Ontvang je bloedtesten resultaten in onze app
            </p>
          </div>

          {/* Right Column: Features List */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
              <UserCheck size={20} className="text-gray-600 flex-shrink-0" />
              <span
                className="text-base font-geist-medium"
                style={{ color: "rgb(var(--color-paragraaf-secondary))" }}
              >
                100% vanuit huis
              </span>
            </div>
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
              <FileText size={20} className="text-gray-600 flex-shrink-0" />
              <span
                className="text-base font-geist-medium"
                style={{ color: "rgb(var(--color-paragraaf-secondary))" }}
              >
                Ontdek verborgen tekorten
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck size={20} className="text-gray-600 flex-shrink-0" />
              <span
                className="text-base font-geist-medium"
                style={{ color: "rgb(var(--color-paragraaf-secondary))" }}
              >
                Gepersonaliseerd gezondheidsadvies
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p
          className="text-center font-geist-regular text-base md:text-lg"
          style={{ color: "rgb(var(--color-paragraaf-secondary))" }}
        >
          Geen producten gevonden.
        </p>
      )}
    </main>
  );
}
