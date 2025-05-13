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
    src: "/images/other/models/yanuzay_women_ordering_on_her_phone_in_a_cafe_--ar_23_--sref__25b8826f-9935-4cb6-9a71-3e93f935fd0b_2.png",
    // content prop is niet meer nodig
  },
  {
    category: "Stap 2",
    title: "Ontvang testkit thuis",
    src: "/images/other/models/Untitled-1.jpg",
  },
  {
    category: "Stap 3",
    title: "Neem test af en stuur op",
    src: "/images/other/models/yanuzay_women_ordering_on_her_phone_in_a_cafe_--ar_23_--sref__4cf16384-af90-4112-9901-8250fe396feb_3.png", // Pas pad eventueel aan
  },
  {
    category: "Stap 4",
    title: "Ontvang resultaten en advies",
    src: "/images/other/models/yanuzay_women_running_in_Amsterdam_--ar_23_--sref_470043244_-_9aec32d1-8b6e-4a13-a772-f888905f8538_1.png",
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
