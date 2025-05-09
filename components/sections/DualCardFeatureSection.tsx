import Image from "next/image";
import { SparklesIcon } from "@heroicons/react/24/outline";
import SectionSubheadingLeft from "../elements/SpanSubheadingGreenTextAlignStart";
import Button from "../elements/Button";
import ButtonInteractive from "../elements/ButtonInteractive";

const DualCardFeatureSection = () => {
  return (
    <section className="bg-[rgb(var(--color-white-bg))] py-10 md:py-18 overflow-hidden">
      <div className="content-container">
        {/* Hoofdsectie met overlap effect en grote afbeelding */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:items-center relative">
          {/* Content sectie met informatie */}
          <div className="lg:w-1/2 lg:pr-6 relative z-10">
            <SectionSubheadingLeft
              spanText="Jouw Gezondheid, Jouw Controle"
              headingText="Een persoonlijke aanpak om gezonde jaren aan uw leven toe te
              voegen"
            />

            <p className="text-[rgb(var(--color-paragraaf))] mb-6">
              Moeiteloos bloedtesten thuis, een intuïtieve app en rapportages
              van deskundige artsen.
            </p>

            {/* Feature punten met verbeterde styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start p-4 rounded-xl bg-[rgb(var(--color-extra-light-green))] hover:shadow-md transition-all duration-300">
                <div className="bg-[rgb(var(--color-normal-green))] rounded-full p-2 mr-3 flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[rgb(var(--color-black-headings-buttons))] font-medium text-base mb-1">
                    App
                  </h3>
                  <p className="text-sm text-[rgb(var(--color-paragraaf))]">
                    Volg je gezondheid eenvoudig via onze moderne app
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 rounded-xl bg-[rgb(var(--color-extra-light-green))] hover:shadow-md transition-all duration-300">
                <div className="bg-[rgb(var(--color-normal-green))] rounded-full p-2 mr-3 flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[rgb(var(--color-black-headings-buttons))] font-medium text-base mb-1">
                    Persoonlijke aanpak
                  </h3>
                  <p className="text-sm text-[rgb(var(--color-paragraaf))]">
                    Op maat gemaakte gezondheidsadviezen
                  </p>
                </div>
              </div>
            </div>

            <div>
              <ButtonInteractive href="/questionnaire/1">
                Ontwerp mijn test
              </ButtonInteractive>
            </div>
          </div>

          {/* Afbeeldingssectie vereenvoudigd */}
          <div className="lg:w-1/2 relative">
            <div className="relative mx-auto lg:mx-0 lg:ml-auto max-w-md">
              <Image
                src="/images/other/hbA1c-biomarker-vrouw-meten.png"
                alt="Persoonlijke gezondheidsaanpak met Nieuw Leven Lab"
                width={500}
                height={600}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={90}
              />
            </div>
          </div>
        </div>

        {/* Wetenschappelijke onderbouwing - Apple-stijl */}
        <div className="mt-16 mb-16 pt-8 pb-8 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-[rgb(var(--color-normal-green))]">
                Wetenschappelijk
              </p>
              <p className="text-2xl font-light text-[rgb(var(--color-black-headings-buttons))]">
                30+ jaar
              </p>
              <p className="text-sm text-[rgb(var(--color-paragraaf-secondary))]">
                onderzoek naar biohacking & gezondheidsoptimalisatie
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-[rgb(var(--color-normal-green))]">
                Beproefde methode
              </p>
              <p className="text-2xl font-light text-[rgb(var(--color-black-headings-buttons))]">
                200.000+
              </p>
              <p className="text-sm text-[rgb(var(--color-paragraaf-secondary))]">
                uitgevoerde tests en analyses
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-[rgb(var(--color-normal-green))]">
                Onze overtuiging
              </p>
              <p className="text-sm text-[rgb(var(--color-paragraaf-secondary))] leading-relaxed">
                Wij geloven dat datagestuurde personalisatie de revolutie op het
                gebied van gezondheid en levensduur zal aanjagen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualCardFeatureSection;
