import React from "react";
import Image from "next/image";
import ButtonInteractive from "../elements/ButtonInteractive";

const HeroProductImageSection = () => {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-black  overflow-hidden section">
      <Image
        src="/images/other/models/2-women-running-and-smiling-nieuw-leven-lab.jpg"
        alt="Sfeervolle dome tent in de natuur bij schemering"
        fill
        priority
        className="object-cover w-full h-full absolute inset-0 z-0 md:object-center"
        style={{ objectPosition: "80% center" }}
        sizes="(max-width: 768px) 100vw, 1200px"
      />
      {/* Donkere overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 z-10" />
      <div className="content-container relative z-20 flex flex-col items-center justify-end text-center py-10 md:py-15 gap-8 h-full min-h-[60vh]">
        <h1 className="text-white text-3xl md:text-5xl md:font-light leading-tight drop-shadow-xl mb-6">
          Ontdek jouw persoonlijke bloedtest <br className="hidden md:block" />{" "}
          en voel je fitter en energieker
        </h1>
        <ButtonInteractive href="/questionnaire/1">
          Ontwerp mijn test
        </ButtonInteractive>
      </div>
    </section>
  );
};

export default HeroProductImageSection;
