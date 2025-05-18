"use client";

import React from "react";
import {
  Carousel,
  Card,
} from "@/components/ui/apple-hoe-het-werkt-cards-carousel";

// Verwijderde BloedtestContent component - niet meer nodig

// Data voor de "Hoe het werkt" carousel
const hoeHetWerktData = [
  {
    category: "Stap 1",
    title: "Bestel eenvoudig online",
    src: "/images/other/models/0_2.jpeg",
  },
  {
    category: "Stap 2",
    title: "Ontvang testkit thuis",
    src: "/images/other/models/modle-wioth-product.jpg",
  },
  {
    category: "Stap 3",
    title: "Neem test af en stuur op",
    src: "/images/other/models/men-test-bloedtest-nieuw-leven-lab-model.jpeg",
  },
  {
    category: "Stap 4",
    title: "Ontvang resultaten en advies",
    src: "/images/other/yanuzay_two_athletic_women_jogging_side-by-side_laughing_mid-_28570fbd-f483-47ef-ac24-52d7c6aff13b_3.png",
  },
];

// Component hernoemd voor duidelijkheid
export default function HoeHetWerktCarouselSection() {
  const cards = hoeHetWerktData.map((card, index) => (
    // Geen content prop meer nodig voor Card
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    // Sectie styling kan behouden blijven of aangepast worden indien nodig
    <section className="w-full py-10 md:py-12 bg-[rgb(var(--color-extra-light-green))] overflow-hidden">
      {/* Overflow hidden toegevoegd ivm mogelijke horizontale scroll van carousel op mobile */}
      <div className="content-container">
        {/* Titel en subtitel aangepast */}
        <h2 className="text-[rgb(var(--color-black-headings-buttons))] mb-4">
          Hoe werkt het?
        </h2>
        <p className="text-[rgb(var(--color-paragraaf))]">
          In vier eenvoudige stappen naar inzicht in jouw gezondheid.
        </p>
        <Carousel items={cards} />
      </div>
    </section>
  );
}
