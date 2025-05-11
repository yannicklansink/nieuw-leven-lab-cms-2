import React from "react";
import Image from "next/image";
import Button from "../elements/Button"; // Aanname: Button component staat in ../elements/
import GradientText from "../elements/GradientText";

const HeroProductSection = () => {
  return (
    <>
      {/* Desktop Hero Section */}
      <section className="hidden md:flex py-8">
        <div className="flex w-full justify-between items-start">
          {/* H1 helemaal links */}
          <div className="w-1/2 flex-shrink-0">
            <GradientText rightText="vanuit huis" gradientText="100% " />
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
        <GradientText rightText="vanuit huis" gradientText="100% " />
      </section>
    </>
  );
};

export default HeroProductSection;
