import Link from "next/link";
import Image from "next/image";
import React from "react";
import Button from "@/components/elements/Button";

// Define the product interface (consistent with other uses)
interface HomePageProduct {
  slug: string;
  title: string;
  imageUrl: string;
  omschrijving_kort: string; // Keep for potential future use, though not displayed now
  price?: number;
}

interface ProductCardProps {
  product: HomePageProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/product/bloedtesten/${product.slug}`}
      className="block h-full group" // Added h-full and group for potential hover effects on card
    >
      {/* Product Card Structure */}
      <div
        className="shadow-md overflow-hidden h-full flex flex-col p-6 group-hover:shadow-lg transition-shadow duration-300 ease-in-out"
        style={{
          backgroundColor: "rgb(var(--color-extra-light-green))",
        }}
      >
        {product.imageUrl && (
          <div className="relative w-full h-64 mb-6 flex justify-center items-center">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={250}
              height={250}
              objectFit="contain"
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        )}
        {/* Product title using CSS variable - Added min-height */}
        <h3
          className="font-geist-semibold text-base md:text-lg mb-4 text-center flex-grow min-h-[6rem]"
          style={{
            color: "rgb(var(--color-black-headings-and-buttons))",
          }}
        >
          {product.title}
        </h3>
        <div className="mt-auto flex justify-between items-center pt-3">
          {/* Price using CSS variable */}
          <span
            className="font-geist-medium text-sm md:text-base"
            style={{
              color: "rgb(var(--color-black-headings-and-buttons))",
            }}
          >
            {product.price ? `€${product.price.toFixed(2)}` : ""}
          </span>
          {/* Button acts purely visually now, Link handles navigation */}
          <Button
            variant="custom"
            style={{
              backgroundColor: "rgb(var(--color-white-bg))",
              color: "rgb(var(--color-black-headings-and-buttons))",
            }}
            customClassName="hover:bg-gray-200 transition-colors duration-150 !py-2 !px-4 text-xs !font-medium pointer-events-none"
            asSpan
          >
            Lees verder
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
