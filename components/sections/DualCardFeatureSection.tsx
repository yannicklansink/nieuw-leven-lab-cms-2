import Image from "next/image";
import { SparklesIcon } from "@heroicons/react/24/outline"; // Placeholder icon, vervang indien nodig
import SectionSubheading from "../elements/SpanSubheadingGreen";
import Button from "../elements/Button";

const FoodLoggingSection = () => {
  return (
    <section className="bg-[rgb(var(--color-white))] py-12 md:py-16 text-[rgb(var(--color-white-bg))]">
      <div className="content-container">
        <div className="mb-4 md:mb-8">
          <SectionSubheading
            spanText="Nieuw Leven Lab MEMBERSHIP"
            headingText="Ontdek de kracht van jouw gezondheid"
          />
        </div>

        {/* Container voor de twee naast elkaar geplaatste kaarten - aangepast voor 3:2 verhouding op md+ */}
        <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-stretch">
          {/* Kaart 1: Tekst content - neemt 3 van de 5 kolommen in op md+ */}
          <div className="md:col-span-3 bg-[rgb(var(--color-paragraaf-secondary))] p-6 md:p-10 rounded-lg shadow-xl border border-[rgb(var(--color-paragraaf-secondary))] flex flex-col justify-center">
            <span className="text-xs font-medium uppercase tracking-wide text-[rgb(var(--color-light-green))] mb-2">
              AI-POWERED
            </span>
            <h3 className="mb-4 text-[rgb(var(--color-white-bg))]">
              Een persoonlijke aanpak om gezonde jaren aan uw leven toe te
              voegen
            </h3>
            <p className="text-[rgb(var(--color-white-bg))] opacity-80 mb-6">
              Moeiteloos bloedtesten thuis, een intuïtieve app en rapportages
              van deskundige artsen.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center justify-center text-sm bg-[rgb(var(--color-paragraaf))] text-[rgb(var(--color-white-bg))] py-2 px-4 rounded-lg">
                <SparklesIcon className="w-4 h-4 mr-2 text-[rgb(var(--color-light-green))]" />
                App
              </div>
              <div className="flex items-center justify-center text-sm bg-[rgb(var(--color-paragraaf))] text-[rgb(var(--color-white-bg))] py-2 px-4 rounded-lg">
                <SparklesIcon className="w-4 h-4 mr-2 text-[rgb(var(--color-light-green))]" />
                Persoonlijke aanpak
              </div>
            </div>
            <div className="mt-6">
              <Button href="/product/bloedtesten" variant="secondary">
                Get started
              </Button>
            </div>
          </div>

          {/* Kaart 2: Afbeelding - neemt 2 van de 5 kolommen in op md+ */}
          <div className="md:col-span-2 p-6 md:p-10 rounded-lg shadow-xl border border-[rgb(var(--color-normal-green))] flex items-center justify-center">
            {/* Inner container voor afbeelding om max-width en relatieve positionering te beheren */}
            <div className="relative w-full max-w-xs mx-auto md:max-w-sm rounded-lg overflow-hidden">
              <Image
                src="/images/other/hbA1c-biomarker-vrouw-meten.png" // Pad gecorrigeerd
                alt="App interface showing food logging with AI"
                width={300} // Aangepast voor de container met padding
                height={600} // Aangepast voor de container met padding
                className="rounded-lg w-full h-auto object-cover max-h-[500px] md:max-h-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodLoggingSection;
