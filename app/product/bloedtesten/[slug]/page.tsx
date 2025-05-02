import fs from "fs/promises";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";

// Define an interface for the product structure (adjust based on your actual JSON structure)
interface Product {
  slug: string;
  titel: string;
  omschrijving_kort: string;
  description: string;
  imageUrl: string;
  prijs?: number;
  aantalBiomarkers?: number;
  // Add other expected product properties here
  [key: string]: any; // Allow for other properties
}

// Helper function to get product data
async function getProductData(slug: string): Promise<Product | undefined> {
  const filePath = path.join(process.cwd(), "data", "products.json");
  try {
    const jsonData = await fs.readFile(filePath, "utf-8");
    const products: Product[] = JSON.parse(jsonData);

    // Ensure products is an array before finding
    if (!Array.isArray(products)) {
      console.error("Error: products.json does not contain a valid array.");
      return undefined;
    }

    return products.find((product) => product.slug === slug);
  } catch (error) {
    console.error("Error reading or parsing products.json:", error);
    return undefined;
  }
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const products = JSON.parse(jsonData);

  // Ensure products is an array before mapping
  if (!Array.isArray(products)) {
    console.error("Error: products.json does not contain a valid array.");
    return [];
  }

  return products.map((product: Product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductData(params.slug);

  if (!product) {
    return {
      title: "Product Niet Gevonden",
      description: "Dit product kon niet worden gevonden.",
    };
  }

  return {
    title: product.titel,
    description: product.omschrijving_kort,
    // Add other metadata fields as needed, e.g., openGraph images
  };
}

// Product Page Component
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductData(params.slug);

  if (!product) {
    // Handle case where product is not found (e.g., show a 404 or a message)
    // You might want to use the `notFound()` function from `next/navigation` here
    return <div>Product niet gevonden.</div>;
  }

  // Render the product details
  return (
    <div className="content-container mx-auto p-4 md:p-6 bg-beige_bg">
      {/* Basic structure based on branding guidelines */}
      <section className="my-4 md:my-6 p-4 md:p-6 bg-white rounded-lg md:rounded-xl shadow-md">
        {/* Product Image */}
        {product.imageUrl && (
          <div className="mb-6">
            <Image
              src={product.imageUrl}
              alt={product.titel}
              width={800}
              height={400}
              className="w-full h-auto object-cover rounded-lg shadow-md"
              priority
            />
          </div>
        )}

        <h1 className="font-geist-bold text-2xl md:text-4xl text-black_headings_and_buttons mb-4">
          {product.titel}
        </h1>

        {/* Short Description */}
        <p className="font-geist-regular text-base md:text-lg text-paragraaf mb-2">
          {product.omschrijving_kort}
        </p>

        {/* Price */}
        {product.prijs && (
          <p className="font-geist-semibold text-xl md:text-2xl text-normal_green my-4">
            €{product.prijs.toFixed(2)}
          </p>
        )}

        {/* Biomarker Count */}
        {product.aantalBiomarkers && (
          <p className="font-geist-regular text-base md:text-lg text-paragraaf mb-4">
            Aantal biomarkers: {product.aantalBiomarkers}
          </p>
        )}

        {/* Full Description - rendering paragraphs based on newlines */}
        {product.description && (
          <div className="mt-6 space-y-4 font-geist-regular text-base md:text-lg text-paragraaf">
            {product.description.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Placeholder for Biomarkers List or other components */}
        <div className="mt-8 border-t pt-6">
          <h2 className="font-geist-semibold text-xl md:text-2xl text-black_headings_and_buttons mb-4">
            Wat wordt er gemeten?
          </h2>
          {/* TODO: Render the biomarkers list (product.biomarkers) */}
          <p className="text-sm text-gray-500">
            Details over de biomarkers volgen nog...
          </p>
          {/* TODO: Add Buy Button / CTA */}
        </div>
      </section>
    </div>
  );
}
