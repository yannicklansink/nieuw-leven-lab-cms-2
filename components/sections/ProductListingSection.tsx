import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Button from "@/components/elements/Button";
import ProductCard from "@/components/elements/ProductCard";

// Define the same product interface used in the parent page
interface HomePageProduct {
  slug: string;
  title: string;
  imageUrl: string;
  omschrijving_kort: string;
  price?: number;
}

interface ProductListingSectionProps {
  loading: boolean;
  error: string | null;
  products: HomePageProduct[];
}

const ProductListingSection: React.FC<ProductListingSectionProps> = ({
  loading,
  error,
  products,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  // State for Prev/Next buttons
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // Set initial state
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      // Clean up listeners
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-12">
      {/* Gebruik de nieuwe component klasse */}
      <p className="section-intro-green-text">
        Ontdek Nieuw Leven Lab
      </p>
      {/* Title using CSS variable */}
      <h2
        className="mb-6 text-center"
        style={{ color: "rgb(var(--color-black-headings-and-buttons))" }}
      >
        Populaire bloedtesten
      </h2>
      {/* "Shop all" button - Link to the actual shop page */}
      <div className="text-center mb-10">
        <Button
          href="/product/bloedtesten" // Updated href to the new shop page
          variant="primary"
        >
          Shop alle producten
        </Button>
      </div>

      {loading && (
        <p
          className="text-center font-geist-regular text-base md:text-lg"
          style={{ color: "rgb(var(--color-paragraaf-secondary))" }}
        >
          Producten laden...
        </p>
      )}
      {/* Standard Tailwind class for error color */}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && products.length > 0 ? (
        <div className="relative">
          {/* Embla Carousel Structure */}
          <div className="embla overflow-hidden relative" ref={emblaRef}>
            <div className="embla__container flex">
              {products.map((product) => (
                <div
                  className="embla__slide flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0 pl-4 h-full"
                  key={product.slug}
                >
                  {/* Use the reusable ProductCard component */}
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Prev/Next Buttons - Desktop Only */}
          <button
            className="embla__prev absolute top-1/2 -translate-y-1/2 left-[-15px] md:left-[-20px] z-10 bg-white p-2 rounded-full shadow-md hidden md:flex items-center justify-center disabled:opacity-30"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            aria-label="Vorige product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-black_headings_and_buttons"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            className="embla__next absolute top-1/2 -translate-y-1/2 right-[-15px] md:right-[-20px] z-10 bg-white p-2 rounded-full shadow-md hidden md:flex items-center justify-center disabled:opacity-30"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            aria-label="Volgende product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-black_headings_and_buttons"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      ) : (
        !loading &&
        !error && (
          <p
            className="text-center font-geist-regular text-base md:text-lg"
            style={{ color: "rgb(var(--color-paragraaf-secondary))" }}
          >
            Geen producten gevonden.
          </p>
        )
      )}
    </section>
  );
};

export default ProductListingSection;
