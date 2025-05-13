import Image from "next/image";

export default function FertilityInfoCard() {
  return (
    <>
      {/* Sectie 1: Afbeelding links, Tekst rechts */}
      <section className="py-12 md:py-20 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Afbeelding links */}
        <div className="w-full md:w-1/2 flex justify-start">
          <div className="w-full md:max-w-md shadow-md overflow-hidden">
            <div className="relative w-full">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "400/333" }}
              >
                <Image
                  src="/images/other/models/model-women-holding-nieuw-leven-lab-product.png"
                  alt="Vrouw doet een vruchtbaarheidstest thuis"
                  width={400}
                  height={500}
                  className="img-styled w-full absolute top-0 left-0"
                  style={{
                    height: "150%",
                    objectFit: "cover",
                    objectPosition: "bottom",
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        {/* Tekst en kaart rechts */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-[rgb(var(--color-black-headings-buttons))] mb-4 leading-tight">
            Je lichaam stuurt signalen vóórdat symptomen optreden
          </h2>
          <p className="text-[rgb(var(--color-paragraaf))] mb-8 max-w-xl">
            Onze technologie helpt symptomen zichtbaar maken.
          </p>
          <hr className="border-t border-gray-200 mb-8" />
          <div className="flex items-center gap-6">
            <span className="text-2xl md:text-2xl font-light text-[rgb(var(--color-black-headings-buttons))]">
              Jij bent uniek, dus je test ook
            </span>
            <a
              href="/questionnaire/1"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-16 h-16 bg-[rgb(var(--color-white-bg))] rounded-md shadow flex items-center justify-center">
                <span className="text-3xl font-bold text-[rgb(var(--color-black-headings-buttons))]">
                  +
                </span>
              </div>
              <span className="text-3xl text-[rgb(var(--color-black-headings-buttons))]">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Sectie 2: Tekst links, Afbeelding rechts */}
      <section className="py-12 md:py-20 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Tekst en kaart links */}
        <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-[rgb(var(--color-black-headings-buttons))] mb-4 leading-tight">
            Jouw bloed vertaald naar persoonlijke gezondheidsscores
          </h2>
          <p className="text-[rgb(var(--color-paragraaf))] mb-8 max-w-xl">
            Analyseer jouw biomarkers voor betere gezondheidskeuzes.
          </p>
          <hr className="border-t border-gray-200 mb-8" />
          <div className="flex items-center gap-6">
            <span className="text-2xl md:text-2xl font-light text-[rgb(var(--color-black-headings-buttons))]">
              Ontdek jouw persoonlijke scores
            </span>
            <a
              href="/questionnaire/1"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-16 h-16 bg-[rgb(var(--color-white-bg))] rounded-md shadow flex items-center justify-center">
                <span className="text-3xl font-bold text-[rgb(var(--color-black-headings-buttons))]">
                  +
                </span>
              </div>
              <span className="text-3xl text-[rgb(var(--color-black-headings-buttons))]">
                →
              </span>
            </a>
          </div>
        </div>
        {/* Afbeelding rechts */}
        <div className="w-full md:w-1/2 flex justify-end order-1 md:order-2">
          <div className="w-full md:max-w-md shadow-md overflow-hidden">
            <div className="relative w-full">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "400/333" }}
              >
                <Image
                  src="/images/other/app/app-bloedtest-women.jpg"
                  alt="Vrouw doet een vruchtbaarheidstest thuis"
                  width={400}
                  height={500}
                  className="img-styled w-full absolute top-0 left-0"
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "right",
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
