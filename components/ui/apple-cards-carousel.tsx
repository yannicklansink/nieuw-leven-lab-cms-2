"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  // useContext, // Niet meer nodig in Card
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  // IconX, // Niet meer nodig
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
// import { AnimatePresence, motion } from "motion/react"; // AnimatePresence niet meer nodig
import { motion } from "motion/react"; // motion is nog wel nodig voor de kaart zelf
// import type { ImageProps } from "next/image"; // Originele import, wordt hieronder aangepast
import NextImage, { type ImageProps as NextImageProps } from "next/image"; // NextImage geïmporteerd
// import { useOutsideClick } from "@/hooks/use-outside-click"; // Niet meer nodig

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type CardType = {
  // Hernoemd van Card naar CardType om conflicten te voorkomen
  src: string;
  title: string;
  category: string;
  content: React.ReactNode; // Content is nu niet meer gebruikt in de Card, maar type blijft voor data structuur
};

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  // const [currentIndex, setCurrentIndex] = useState(0); // Niet meer nodig

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    // <CarouselContext.Provider // Context Provider niet meer nodig
    //   value={{ onCardClose: handleCardClose, currentIndex }}
    // >
    <div className="relative w-full">
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div
          className={cn(
            "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
          )}
        ></div>

        <div className="flex flex-row justify-start gap-4">
          {items.map((item, index) => (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                  once: true,
                },
              }}
              key={"card" + index}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mr-10 flex justify-end gap-2">
        <button
          className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
        </button>
        <button
          className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </div>
    // </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CardType;
  index: number;
  layout?: boolean;
}) => {
  return (
    <>
      <motion.div
        layoutId={layout ? `card-${card.title}` : undefined}
        className="relative z-10 flex h-80 w-56 flex-col justify-between overflow-hidden bg-white dark:bg-gray-100 md:h-[32rem] md:w-96 shadow-md"
      >
        <div className="relative z-20 p-6 md:p-8 w-full">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-left text-[rgb(var(--color-normal-green))] md:text-base"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-1 md:mt-2 max-w-xs text-left font-sans [text-wrap:balance] text-[rgb(var(--color-black-headings-buttons))] md:text-3xl"
          >
            {card.title}
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-2/3 md:h-3/4 w-full px-4 md:px-6 pt-4 md:pt-6">
          <div className="relative w-full h-full">
            <BlurImage
              src={card.src}
              alt={card.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export const BlurImage = ({
  src,
  className,
  alt,
  fill,
  width,
  height,
  blurDataURL,
  ...rest
}: NextImageProps & { fill?: boolean; blurDataURL?: string }) => {
  return (
    <NextImage
      className={cn("h-full w-full transition duration-300", className)}
      src={src}
      alt={alt ? alt : "Background of a beautiful view"}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      {...rest}
    />
  );
};
