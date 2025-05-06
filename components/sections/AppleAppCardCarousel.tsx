"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

// Aangepaste content component voor bloedtesten
// Deze kan intern blijven in dit bestand of eventueel naar een eigen bestand als het complexer wordt.
const BloedtestContent = ({ type }: { type: string }) => {
  if (type === "resultaten") {
    return (
      <>
        <div className="bg-[rgb(var(--color-extra-light-green))] p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-[rgb(var(--color-paragraaf))] text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-[rgb(var(--color-dark-green)))]">
              Direct Inzicht in je Resultaten.
            </span>{" "}
            Bekijk je scores en begrijp wat ze betekenen voor jouw gezondheid.
            Veroudering is een proces dat je kunt sturen.
          </p>
          <img
            src="/images/other/app/app-design-1iphoddne.png"
            alt="Nieuw Leven Lab App - Mijn Bloedtest Resultaten"
            className="w-full md:w-1/2 h-64 md:h-80 mx-auto object-contain mt-4 md:mt-6"
          />
        </div>
      </>
    );
  } else if (type === "rapporten") {
    return (
      <>
        <div className="bg-[rgb(var(--color-extra-light-green))] p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-[rgb(var(--color-paragraaf))] text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-[rgb(var(--color-dark-green)))]">
              Al je Gezondheidsrapporten op één Plek.
            </span>{" "}
            Upload en beheer je bloedtest-PDF's eenvoudig en veilig. Altijd en
            overal toegang tot je gegevens.
          </p>
          <img
            src="/images/other/app/app-design-show-gezondheidrapport-overzicht.png"
            alt="Nieuw Leven Lab App - Jouw Gezondheidsrapporten"
            className="w-full md:w-1/2 h-64 md:h-80 mx-auto object-contain mt-4 md:mt-6"
          />
        </div>
      </>
    );
  } else if (type === "trends") {
    return (
      <>
        <div className="bg-[rgb(var(--color-extra-light-green))] p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-[rgb(var(--color-paragraaf))] text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-[rgb(var(--color-dark-green)))]">
              Volg je Biomarker Trends.
            </span>{" "}
            Analyseer de voortgang van specifieke waarden, zoals Leucocyten, en
            ontdek wat aandacht nodig heeft.
          </p>
          <img
            src="/images/other/app/app-design-show-trends-leucocyten.png"
            alt="Nieuw Leven Lab App - Leucocyten Trend"
            className="w-full md:w-1/2 h-64 md:h-80 mx-auto object-contain mt-4 md:mt-6"
          />
        </div>
      </>
    );
  } else {
    // Fallback / Algemeen / Vitaminen / Detox / Suiker (kunnen aparte cases worden)
    return (
      <>
        <div className="bg-[rgb(var(--color-extra-light-green))] p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-[rgb(var(--color-paragraaf))] text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-[rgb(var(--color-dark-green)))]">
              Ontdek de Kracht van Data.
            </span>{" "}
            Onze app geeft je de tools om je gezondheid te begrijpen en te
            optimaliseren.
          </p>
          {/* Mogelijk een generieke app afbeelding hier */}
        </div>
      </>
    );
  }
};

// Data voor de bloedtest carousel
const bloedtestData = [
  {
    category: "App Feature",
    title: "Mijn Bloedtest Resultaten",
    src: "/images/other/app/app-design-1iphoddne.png",
    content: <BloedtestContent type="resultaten" />,
  },
  {
    category: "App Feature",
    title: "Jouw Gezondheidsrapporten",
    src: "/images/other/app/app-design-show-gezondheidrapport-overzicht.png",
    content: <BloedtestContent type="rapporten" />,
  },
  {
    category: "App Feature",
    title: "Analyseer je Trends",
    src: "/images/other/app/app-design-show-trends-leucocyten.png",
    content: <BloedtestContent type="trends" />,
  },
];

export default function BloedtestCarouselSection() {
  const cards = bloedtestData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className="w-full py-10 md:py-20 bg-[rgb(var(--color-extra-light-green))]">
      <div className="content-container">
        <h2 className="text-[rgb(var(--color-black-headings-buttons))] mb-4">
          Ontdek onze bloedtesten
        </h2>
        <p className="text-[rgb(var(--color-paragraaf))] mb-8">
          Elk van onze tests is ontwikkeld om specifieke aspecten van je
          gezondheid in kaart te brengen.
        </p>
        <Carousel items={cards} />
        <p className="text-xs text-[rgb(var(--color-paragraaf-secondary))] mt-8 md:mt-12">
          Let op: Het design van de app is continu in ontwikkeling en wordt
          voortdurend geoptimaliseerd voor de beste gebruikerservaring.
          Afbeeldingen zijn illustratief en kunnen afwijken van de huidige
          versie.
        </p>
      </div>
    </section>
  );
}
