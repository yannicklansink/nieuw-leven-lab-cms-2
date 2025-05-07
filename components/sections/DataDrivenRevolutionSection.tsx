"use client";

import Image from "next/image";
import React from "react";
import Button from "@/components/elements/Button"; // Importeer de Button component

export default function DataDrivenRevolutionSection() {
  return (
    <section className="content-container w-full bg-white py-12 md:py-20">
      {/* Afbeelding bovenaan de sectie */}
      <div className="w-full h-auto min-h-[250px] md:h-[400px] lg:h-[500px] relative overflow-hidden">
        <Image
          src="/images/other/man-loopt-door-woestijn-aspectratio-3-2.jpeg"
          alt="Man loopt door woestijn"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Tekstsectie met twee kolommen */}
      <div className="py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Linkerkolom: Grote cursieve tekst */}
          <div className="md:pr-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-[rgb(var(--color-black-headings-buttons))]">
              Wij geloven dat datagestuurde personalisatie de revolutie in gezondheid en een lang leven zal leiden.
            </h2>
          </div>

          {/* Rechterkolom: Paragrafen en knop */}
          <div>
            <p className="text-[rgb(var(--color-paragraaf))] mb-6">
              We gebruiken AI om wetenschappelijke ontdekkingen sneller bij jou te brengen en helpen de oorzaken van ziekte en biologische veroudering te ontdekken.
            </p>
            <p className="text-[rgb(var(--color-paragraaf))] mb-8">
              Ervaar de kracht van baanbrekende wetenschap en technologie met de testen, inzichten en oplossingen van Nieuw Leven Lab.
            </p>
            <Button href="/over-ons" variant="secondary" customClassName="border border-[rgb(var(--color-black-headings-buttons))] hover:bg-gray-100">
              Onze Aanpak
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 