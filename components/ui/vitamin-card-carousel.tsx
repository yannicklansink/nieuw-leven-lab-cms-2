"use client";
import React, { useEffect, useRef, useState } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Props voor een enkele categoriekaart
export interface CategoryCardProps {
  categoryName: string;
  bloodValues: string[];
}

// Component voor een enkele categoriekaart
export const CategoryCard = ({
  categoryName,
  bloodValues,
}: CategoryCardProps) => {
  return (
    <div className="flex flex-col bg-white p-5 rounded-md w-64 h-80 shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold text-[rgb(var(--color-black-headings-buttons))] mb-2 flex-shrink-0">
        {categoryName}
      </h3>
      <div className="overflow-y-auto flex-grow pr-1">
        <ul className="list-none text-xs text-[rgb(var(--color-paragraaf))] space-y-1">
          {bloodValues.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Props voor de Carousel component
interface CarouselProps {
  items: React.ReactElement<CategoryCardProps>[]; // Accepteert een array van CategoryCard elementen
  initialScroll?: number;
}

// Carousel component
export const VitaminCarousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // Added -1 for precision
    }
  };

  const scrollBy = (offset: number) => {
    if (carouselRef.current) {
      const currentScrollLeft = carouselRef.current.scrollLeft;
      // Probeer het eerste kind van het eerste item in de carousel te vinden, wat de daadwerkelijke kaart zou moeten zijn.
      const firstCardElement = carouselRef.current.children[0]?.children[0] as HTMLElement;
      const cardWidth = firstCardElement?.offsetWidth || 256; // Breedte van een kaart (w-64 is 256px)
      const gap = 16; // gap-4 = 1rem = 16px
      const scrollAmount = cardWidth + gap;
      
      let targetScroll = currentScrollLeft + offset * scrollAmount;
      
      if (offset > 0) { // Rechts scrollen
        targetScroll = Math.ceil(targetScroll / scrollAmount) * scrollAmount;
      } else { // Links scrollen
        targetScroll = Math.floor(targetScroll / scrollAmount) * scrollAmount;
      }
      
      carouselRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };
  
  const scrollLeft = () => scrollBy(-1);
  const scrollRight = () => scrollBy(1);


  useEffect(() => {
    const currentCarouselRef = carouselRef.current;
    if (currentCarouselRef) {
      // Een debounce functie om checkScrollability niet te vaak aan te roepen
      let timeoutId: NodeJS.Timeout;
      const debouncedCheckScrollability = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(checkScrollability, 100);
      };

      currentCarouselRef.addEventListener("scroll", debouncedCheckScrollability);
      window.addEventListener("resize", debouncedCheckScrollability); 
      checkScrollability(); // Initiële controle

      // Roep checkScrollability aan nadat items zijn geladen/veranderd
      const observer = new MutationObserver(debouncedCheckScrollability);
      if (carouselRef.current && carouselRef.current.children[0]) {
         observer.observe(carouselRef.current.children[0], { childList: true, subtree: true });
      }


      return () => {
        currentCarouselRef.removeEventListener("scroll", debouncedCheckScrollability);
        window.removeEventListener("resize", debouncedCheckScrollability);
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }
  }, [items]); // Voeg items toe als dependency, zodat het opnieuw runt als items veranderen

  return (
    <div className="w-full">
      <div
        className="flex w-full overflow-x-auto scroll-smooth py-1 [scrollbar-width:thin] scrollbar-thumb-gray-400 scrollbar-track-gray-100 md:py-1"
        ref={carouselRef}
        // onScroll is al afgehandeld door de event listener in useEffect
      >
        <div className={cn("flex flex-row justify-start gap-4 py-4")}> 
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.4,
                  delay: 0.1 * index,
                  ease: "easeOut",
                },
              }}
              key={index} 
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
      {/* Navigatie Knoppen */}
      <div className="flex justify-start items-center gap-3 mt-4">
        <button
          aria-label="Scroll left"
          className={cn(
            "relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-150",
            "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800",
            { "opacity-50 cursor-not-allowed": !canScrollLeft }
          )}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <IconArrowNarrowLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Scroll right"
          className={cn(
            "relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-150",
            "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800",
            { "opacity-50 cursor-not-allowed": !canScrollRight }
          )}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <IconArrowNarrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}; 