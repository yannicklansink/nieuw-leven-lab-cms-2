import React from "react";
import Image from "next/image";
import Button from "../elements/Button"; // Aanname: Button component staat in ../elements/

const HeroProductSection = () => {
  return (
    <>
      {/* Desktop Hero Section */}
      <section className="hidden md:flex py-8">
        <div className="flex w-full justify-between items-start">
          {/* H1 helemaal links */}
          <div className="w-1/2 flex-shrink-0">
            <h1>
              100% vanuit huis,
              <br />
              via één platform
            </h1>
          </div>
          {/* Iconen en spans helemaal rechts */}
          <div className="w-1/2 flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2 items-start text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M4.5 3h15M4.5 3v16.973a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V3M4.5 3L9 12M19.5 3L15 12M9 12h6" />
              </svg>
              <span className="text-sm">
                30 jaar wetenschappelijk onderzoek
              </span>
            </div>
            <div className="flex items-center space-x-2 items-start text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <span className="text-sm">Volledig inzicht in je gezondheid</span>
            </div>
            <div className="flex items-center space-x-2 items-start text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="text-sm">100% vanuit huis</span>
            </div>
            <div className="flex items-center space-x-2 items-start text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-sm">Persoonlijk advies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Hero Section - Icons aangepast voor consistentie */}
      <section className="md:hidden py-6">
        {/* 1. 30 jaar wetenschappelijk onderzoek -> Beaker Icon (Aangepast) */}
        <div className="flex items-center space-x-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M4.5 3h15M4.5 3v16.973a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V3M4.5 3L9 12M19.5 3L15 12M9 12h6" />
          </svg>
          {/* Tekst hier eventueel ook aanpassen indien gewenst */}
          <span className="text-sm">30 jaar wetenschappelijk onderzoek</span>
        </div>
        {/* 2. Volledig inzicht in je gezondheid -> Bar Chart Icon (Aangepast) */}
        <div className="flex items-center space-x-2 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          {/* Tekst hier eventueel ook aanpassen indien gewenst */}
          <span className="text-sm">Volledig inzicht in je gezondheid</span>
        </div>
        {/* H1 blijft hetzelfde */}
        <h1>
          100% vanuit huis,
          <br />
          via één platform
        </h1>
      </section>

      {/* --- Start: Samengevoegde Product Cards Sectie --- */}
      <section className="pb-6">
        {/* Enkele grid container voor alle 5 kaarten */}
        {/* Mobiel: 1 kolom. Desktop (md+): 6 kolommen voor layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* --- Bovenste Rij --- */}
          {/* Weight Loss Card (Neemt 3 van 6 kolommen op desktop) */}
          <div className="card bg-[#f7f5f2] overflow-hidden flex md:col-span-3">
            <div className="flex flex-col h-full w-full">
              <div className="flex-grow">
                <h3 className="mb-6 text-2xl">
                  Persoonlijke bloedtesten
                  <br />
                  voor een betere gezondheid.
                </h3>
                <div className="inline-block bg-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                  Best seller
                </div>
                <div className="h-64 relative">
                  <Image
                    src="https://images.pexels.com/photos/8460220/pexels-photo-8460220.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="GLP-1 medication"
                    className="object-contain"
                    fill
                    sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button href="/questionnaire/1" variant="primary">
                  Ontwerp mijn test
                </Button>
              </div>
            </div>
          </div>

          {/* Sparks Card -> Omgezet naar Image Card */}
          <div className="card bg-[#f7f5f2] overflow-hidden md:col-span-3 relative aspect-square md:aspect-auto">
            <Image
              src="/images/other/yanuzay_httpss.mj.runbaDLkYtfTqA_Photo_of_a_woman_holding_up__e036189c-bce4-4624-8dde-45202ce3667b_0_24_11zon.jpg" // Nieuwe src (aanname: in public map)
              alt="Vrouw houdt bloedbuisje vast" // Nieuwe alt
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw" // Controlleert hoe de browser laadt
            />
          </div>

          {/* --- Onderste Rij --- */}
          {/* Zepbound Card (Neemt 2 van 6 kolommen op desktop) */}
          <div className="card bg-[rgb(var(--color-card-bg-zepbound))] overflow-hidden flex items-center justify-between md:col-span-2">
            <div className="flex items-center">
              <div className="w-12 h-12 mr-4">
                <Image
                  src="https://via.placeholder.com/100"
                  alt="Zepbound vial"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-base font-medium">Hoe het werkt</p>
              </div>
            </div>
            <button className="bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-gray-800 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Daily Rise Card (Neemt 2 van 6 kolommen op desktop) */}
          <div className="card bg-[rgb(var(--color-extra-light-green))] overflow-hidden flex items-center justify-between md:col-span-2">
            <div className="flex items-center">
              <div className="w-12 h-12 mr-4">
                <Image
                  src="https://via.placeholder.com/100"
                  alt="Daily Rise product"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-base font-medium">
                  Manifesto
                  <br />
                  waarom wij dit doen
                </p>
              </div>
            </div>
            <button className="bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-gray-800 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Hair Regrowth Card (Neemt 2 van 6 kolommen op desktop) */}
          <div className="card bg-[rgb(var(--color-card-bg-hair))] overflow-hidden flex items-center justify-between md:col-span-2">
            <div className="flex items-center">
              <div className="w-12 h-12 mr-4">
                <Image
                  src="https://via.placeholder.com/100"
                  alt="Hair regrowth product"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-base font-medium">Onze app</p>
              </div>
            </div>
            <button className="bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-gray-800 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>
      {/* --- Einde: Samengevoegde Product Cards Sectie --- */}
    </>
  );
};

export default HeroProductSection;
