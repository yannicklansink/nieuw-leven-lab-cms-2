// Deze pagina component (/confirm/page.tsx) toont de geselecteerde biomarkers, laat de gebruiker aanpassingen maken, en toont de totaalprijs.
// Het haalt data uit de Zustand store en de biomarker catalogus.

"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuestionnaireStore } from "@/hooks/useQuestionnaireStore";
import { catalog, getBiomarkerById } from "@/logic/catalog";
import { BASE_PANEL, CURRENCY_CODE } from "@/logic/constants";
import { calcTotal, formatPrice } from "@/logic/priceUtils";
import { BiomarkerCatalogItem } from "@/types/biomarker";
import TestListTable from "@/components/sections/TestListTable";
import CheckoutButton from "@/components/elements/CheckoutButton";
import SectionSubheading from "@/components/elements/SpanSubheadingGreen";
import { AuroraBackground } from "@/components/ui/background-gradient";

export default function ConfirmPage() {
  const router = useRouter();
  const {
    selectedTests: selectedTestIds,
    toggleTest,
    setRecommendedTests,
  } = useQuestionnaireStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized) {
      // selectedTestIds is nu altijd een array.
      if (selectedTestIds.length === 0 && catalog.length > 0) {
        console.log(
          "ConfirmPage: selectedTests is leeg, initialiseer met BASE_PANEL."
        );
        setRecommendedTests([...BASE_PANEL]);
      }
      setHasInitialized(true);
    }
  }, [selectedTestIds, setRecommendedTests, hasInitialized, catalog]);

  const selectedBiomarkers: BiomarkerCatalogItem[] = useMemo(() => {
    // selectedTestIds is nu altijd een array.
    return selectedTestIds
      .map((id) => getBiomarkerById(id))
      .filter((item): item is BiomarkerCatalogItem => !!item);
  }, [selectedTestIds]);

  const availableBiomarkers: BiomarkerCatalogItem[] = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return catalog
      .filter((item) => !selectedTestIds.includes(item.id)) // selectedTestIds is nu altijd een array
      .filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          (item.category &&
            item.category.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (item.description &&
            item.description.toLowerCase().includes(lowerCaseSearchTerm))
      );
  }, [selectedTestIds, searchTerm, catalog]);

  const totalPriceInCents = useMemo(() => {
    return calcTotal(selectedTestIds); // selectedTestIds is nu altijd een array
  }, [selectedTestIds]);

  if (!hasInitialized && selectedTestIds.length === 0 && catalog.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[rgb(var(--color-white-bg))]">
        <p>Laden...</p>
      </div>
    );
  }

  return (
    <main className="bg-[rgb(var(--color-white-bg))]">
      <AuroraBackground className="h-[50vh] mb-6">
        <div className="relative flex flex-col items-center justify-center h-full px-4 z-10">
          <div className="text-center">
            <SectionSubheading
              spanText="Jouw bloedtest"
              headingText="Controleer en pas je testpanel aan"
            />
            <p className="max-w-2xl mx-auto mt-4 text-lg">
              Pas je testpanel aan door biomarkers toe te voegen of te
              verwijderen op basis van je persoonlijke gezondheidsbehoeften.
            </p>

            <div className="mt-6 flex justify-center">
              <CheckoutButton
                disabled={selectedBiomarkers.length === 0}
                className="px-10"
              >
                Ga naar afrekenen
              </CheckoutButton>
            </div>
          </div>
        </div>
      </AuroraBackground>

      <div className="content-container py-12 md:py-16">
        {/* Geselecteerde Testen - sectie met lichte achtergrond */}
        <section className="mb-12 bg-[rgb(var(--color-extra-light-green))] rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-[rgb(var(--color-black-headings-buttons))]">
              Jouw geselecteerde testen
            </h2>
            <div className="mt-2 md:mt-0">
              <p className="text-[rgb(var(--color-black-headings-buttons))]">
                Totaalprijs: {formatPrice(totalPriceInCents, CURRENCY_CODE)}
              </p>
            </div>
          </div>

          {selectedBiomarkers.length > 0 ? (
            <TestListTable
              tests={selectedBiomarkers}
              onToggleTest={toggleTest}
              actionLabel={() => "Verwijder"}
              highlightColor="bg-[rgb(var(--color-normal-green))] hover:bg-[rgb(var(--color-dark-green))]"
            />
          ) : (
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-[rgb(var(--color-paragraaf))]">
                Je hebt nog geen testen geselecteerd. Voeg testen toe uit de
                onderstaande lijst of ga terug naar de vragenlijst.
              </p>
            </div>
          )}
        </section>

        {/* Beschikbare Testen - witte sectie met subtiele border */}
        <section className="mb-12 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl md:text-2xl font-medium text-[rgb(var(--color-black-headings-buttons))] mb-4">
            Beschikbare biomarkers om toe te voegen
          </h2>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Zoek biomarker op naam, categorie of beschrijving..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-200 rounded-lg focus:ring-[rgb(var(--color-light-green))] focus:border-[rgb(var(--color-normal-green))] transition-colors"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {availableBiomarkers.length > 0 ? (
            <TestListTable
              tests={availableBiomarkers}
              onToggleTest={toggleTest}
              actionLabel={() => "Voeg toe"}
              highlightColor="bg-[rgb(var(--color-normal-green))] hover:bg-[rgb(var(--color-dark-green))]"
            />
          ) : (
            <div className="bg-[rgb(var(--color-extra-light-green))] rounded-lg p-4">
              <p className="text-[rgb(var(--color-paragraaf))]">
                {searchTerm
                  ? "Geen biomarkers gevonden voor je zoekterm."
                  : "Alle beschikbare biomarkers zijn al geselecteerd of er zijn geen biomarkers beschikbaar."}
              </p>
            </div>
          )}
        </section>

        {/* Acties */}
        <section className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
          <button
            onClick={() => router.push("/questionnaire/1")}
            className="order-2 md:order-1 px-8 py-3 border border-[rgb(var(--color-normal-green))] text-[rgb(var(--color-black-headings-buttons))] font-medium rounded-lg hover:bg-[rgb(var(--color-extra-light-green))] transition-colors w-full md:w-auto"
          >
            Terug naar vragenlijst
          </button>

          <div className="order-1 md:order-2 w-full md:w-auto">
            <CheckoutButton
              disabled={selectedBiomarkers.length === 0}
              className="w-full px-10"
            >
              Ga naar afrekenen
            </CheckoutButton>
          </div>
        </section>
      </div>
    </main>
  );
}
