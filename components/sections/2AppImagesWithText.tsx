import Image from "next/image";
import Button from "@/components/elements/Button";

export default function AppImagesWithText() {
  return (
    <section className="py-16 md:py-20">
      <div className="content-container">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          {/* Afbeelding links */}
          <div className="w-full md:w-1/2 relative md:pr-0 flex justify-center md:justify-end">
            <div className="relative w-[320px] h-[420px] md:w-[480px] md:h-[620px] max-w-full">
              <Image
                src="/images/other/app/app-design-2-iphones-min (2).png"
                alt="Bloedtest visualisatie app mockup"
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 320px, 480px"
                priority
              />
            </div>
          </div>
          {/* Tekst rechts */}
          <div className="w-full md:w-1/2 md:pr-6 max-w-md text-left">
            <h2 className="text-[rgb(var(--color-black-headings-buttons))] mb-4">
              Test je hele lichaam en visualiseer al je gegevens.
            </h2>
            <p className="mb-6">
              Een doordacht ontworpen, alles-in-één platform om onze
              persoonlijke gezondheid eenvoudig te verbeteren.
            </p>
            <p className="mb-6">
              Wij geloven dat gezondheid niet in handen moet liggen van artsen
              of zorgsystemen, en dat iedereen zeggenschap moet hebben over zijn
              of haar eigen gezondheid.
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-[rgb(var(--color-paragraaf))] inline-block text-left">
              <li>Gepersonaliseerd.</li>
              <li>Preventief.</li>
              <li>Prestatie verhogend.</li>
            </ul>
            <p className="text-base text-[rgb(var(--color-paragraaf-secondary))] mb-8">
              Terwijl de wereld steeds meer van ons eist, moeten wij meer voor
              onszelf eisen.
            </p>
            <Button href="/questionnaire/1" variant="primary">
              Doe de test
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
