"use client";

import Image from "next/image";
import React from "react";
import SpanSubheadingGreenTextAlignStart from "../elements/SpanSubheadingGreenTextAlignStart";

export default function WelcomeKitSection() {
  return (
    <section className="w-full py-12 md:py-20 overflow-hidden bg-[rgb(var(--color-white))]">
      {/* Achtergrondafbeelding verwijderd, achtergrondkleur toegepast */}

      <div className="content-container">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Linkerkolom: Afbeelding van de kit */}
          <div className="w-full md:w-1/2 lg:w-3/5 rounded-lg overflow-hidden">
            <Image
              src="/images/other/women-wit-softgreen-bloedtest-afleggen.jpeg"
              alt="Jouw persoonlijke testkit productafbeelding"
              width={700}
              height={475}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Rechterkolom: Tekst content */}
          <div className="w-full md:w-1/2 lg:w-2/5">
            <SpanSubheadingGreenTextAlignStart
              spanText="Ontgrendel jouw gezondheidspotentieel"
              headingText="Jouw start naar een vitaler leven"
            />
            
            <hr className="border-gray-300 my-6 md:my-8" />

            <div className="flex justify-between items-start">
              <div>
                <h3 className=" text-[rgb(var(--color-black-headings-buttons))]">Test vandaag nog je bloedwaarden</h3>
                <p className="mt-2">
                Inclusief gepersonaliseerde analyse.
                </p>
              </div>
              <div className="bg-[rgb(var(--color-light-green))] text-white text-sm  px-3 py-1 rounded-full whitespace-nowrap">
                Start vandaag
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 