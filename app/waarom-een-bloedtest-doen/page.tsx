"use client";

import Image from "next/image";
import SectionSubheading from "@/components/elements/SpanSubheadingGreen";
import DualCardFeatureSection from "@/components/sections/DualCardFeatureSection";
import Button from "@/components/elements/Button";
import AppleAppCardCarousel from "@/components/sections/AppleAppCardCarousel";
import AppleTestBloedwaardesCardCarousel from "@/components/sections/AppleBloedwaardesCarouselSection";
import FaqAccordion from "@/components/sections/FaqAccordion";
import AppleHoeHetWerktCardCarousel from "@/components/sections/AppleHoeHetWerktCardCarousel";

export default function WhyBloodtestPage() {
  return (
    <main>
      {/* Hero header sectie zoals in de afbeelding */}
      <section className="py-16 md:py-20 bg-white">
        <div className="content-container">
          {/* Grid voor de twee kolommen layout met maximale ruimte tussen de kolommen */}
          <div className="flex flex-col md:flex-row md:justify-between gap-10 items-start">
            {/* Linkerkolom: Titel en knop */}
            <div className="md:max-w-[45%]">
              <h1 className="text-[rgb(var(--color-black-headings-buttons))] mb-4">
                Krijg een compleet beeld van je gezondheid door regelmatige
                metingen.
              </h1>
              <p className="text-base md:text-lg text-[rgb(var(--color-paragraaf))] mb-6">
                Begrijp hoe je levensstijl je bloedwaarden beïnvloedt.
              </p>

              <div className="mb-6 md:mb-0">
                <Button href="/product/bloedtesten" variant="primary">
                  Start Vandaag
                </Button>
              </div>
            </div>

            {/* Rechterkolom: Voordelen lijst, uiterst rechts geplaatst */}
            <div className="space-y-4 md:border-l border-gray-200 md:pl-10 md:ml-auto">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[rgb(var(--color-white-bg))] flex items-center justify-center border border-[rgb(var(--color-paragraaf-secondary))]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[rgb(var(--color-black-headings-buttons))]"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-[rgb(var(--color-paragraaf))] font-medium">
                  Eenvoudige bloedtest thuis uitvoeren
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[rgb(var(--color-white-bg))] flex items-center justify-center border border-[rgb(var(--color-paragraaf-secondary))]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[rgb(var(--color-black-headings-buttons))]"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-[rgb(var(--color-paragraaf))] font-medium">
                  Gebaseerd op 30+ jaar onderzoek
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[rgb(var(--color-white-bg))] flex items-center justify-center border border-[rgb(var(--color-paragraaf-secondary))]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[rgb(var(--color-black-headings-buttons))]"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-[rgb(var(--color-paragraaf))] font-medium">
                  Persoonlijk gezondheidsrapport
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[rgb(var(--color-white-bg))] flex items-center justify-center border border-[rgb(var(--color-paragraaf-secondary))]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[rgb(var(--color-black-headings-buttons))]"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-[rgb(var(--color-paragraaf))] font-medium">
                  Gepersonaliseerde gezondheidsstrategie
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppleAppCardCarousel />

      <AppleTestBloedwaardesCardCarousel />

      <section className="content-container my-12 md:my-16">
        <h2 className="text-center mb-10">Veelgestelde vragen</h2>
        <div className="w-full max-w-3xl mx-auto">
          <FaqAccordion showItemIds={["item-1", "item-4", "item-6"]} />
        </div>
      </section>

      <AppleHoeHetWerktCardCarousel />
    </main>
  );
}
