"use client";

import { AuroraBackground } from "@/components/ui/background-gradient";
import Button from "@/components/elements/Button";

export default function HeroBackgroundGradient() {
  return (
    <AuroraBackground className="h-[60vh]">
      <div className="relative flex flex-col items-center justify-center h-full px-4">
        <section className="content-container flex flex-col items-center text-center gap-6 md:gap-8 z-10">
          <h2 className="">Ontdek de Kracht van Jouw Gezondheid</h2>
          <p className=" max-w-3xl">
            Krijg diepgaand inzicht in je lichaam met onze geavanceerde
            bloedtesten en neem de controle over je welzijn.
          </p>
          <Button variant="primary" href="/questionnaire/1">
            Ontwerp mijn test
          </Button>
        </section>
      </div>
    </AuroraBackground>
  );
}
