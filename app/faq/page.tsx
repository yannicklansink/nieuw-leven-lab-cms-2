"use client";

import React from "react";
import FaqAccordion from "@/components/sections/FaqAccordion";
import DataDrivenRevolutionSection from "@/components/sections/DataDrivenRevolutionSection";
import HeroBackgroundGradient from "@/components/sections/BackgroundGradient";
import SectionSubheading from "@/components/elements/SpanSubheadingGreen";

export default function FaqPage() {
  return (
    <main className="bg-[rgb(var(--color-white-bg))]">
      {/* Header sectie */}
      <section className="content-container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <SectionSubheading
            spanText="Kennisbank"
            headingText="Veelgestelde vragen"
          />
          <p className="mt-6 text-lg md:text-xl text-[rgb(var(--color-paragraaf))]">
            Ontdek antwoorden op de meest gestelde vragen over onze bloedtesten,
            diensten en het Nieuw Leven Lab platform. Heb je nog vragen? Neem
            dan gerust contact met ons op.
          </p>
        </div>
      </section>

      {/* FAQ Accordion sectie */}
      <section className=" py-16 md:py-20">
        <div className="content-container">
          <div>
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* Data Driven Revolution sectie */}
      <DataDrivenRevolutionSection />

      {/* Gradient Hero sectie onderaan */}
      <HeroBackgroundGradient />
    </main>
  );
}
