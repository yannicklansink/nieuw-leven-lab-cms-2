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

  const handleCheckout = () => {
    // Navigeer naar de checkout pagina (implementatie in Taak 7)
    console.log("Navigeren naar checkout met tests:", selectedBiomarkers);
    router.push("/checkout"); // Placeholder, echte checkout later
  };

  if (!hasInitialized && selectedTestIds.length === 0 && catalog.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Laden...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Controleer en pas je testpanel aan
      </h1>

      {/* Geselecteerde Testen */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Jouw geselecteerde testen
        </h2>
        {selectedBiomarkers.length > 0 ? (
          <TestListTable
            tests={selectedBiomarkers}
            onToggleTest={toggleTest} // toggleTest verwijdert als test al geselecteerd is
            actionLabel={() => "Verwijder"}
            highlightColor="bg-red-500 hover:bg-red-600"
          />
        ) : (
          <p className="text-gray-600">
            Je hebt nog geen testen geselecteerd. Voeg testen toe uit de
            onderstaande lijst of ga terug naar de vragenlijst.
            {/* Optioneel: link terug naar vragenlijst */}
          </p>
        )}
        <div className="mt-6 text-right">
          <p className="text-xl font-semibold text-gray-800">
            Totaalprijs: {formatPrice(totalPriceInCents, CURRENCY_CODE)}
          </p>
        </div>
      </section>

      {/* Beschikbare Testen */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Beschikbare biomarkers om toe te voegen
        </h2>
        <input
          type="text"
          placeholder="Zoek biomarker op naam, categorie of beschrijving..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {availableBiomarkers.length > 0 ? (
          <TestListTable
            tests={availableBiomarkers}
            onToggleTest={toggleTest} // toggleTest voegt toe als test nog niet geselecteerd is
            actionLabel={() => "Voeg toe"}
            highlightColor="bg-green-500 hover:bg-green-600"
          />
        ) : (
          <p className="text-gray-600">
            {searchTerm
              ? "Geen biomarkers gevonden voor je zoekterm."
              : "Alle beschikbare biomarkers zijn al geselecteerd of er zijn geen biomarkers beschikbaar."}
          </p>
        )}
      </section>

      {/* Acties */}
      <section className="text-center">
        <button
          onClick={handleCheckout}
          disabled={selectedBiomarkers.length === 0} // Schakel uit als er geen testen zijn geselecteerd
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg"
        >
          Ga naar afrekenen
        </button>
        <button
          onClick={() => router.push("/questionnaire/1")}
          className="ml-4 px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors text-lg"
        >
          Terug naar vragenlijst
        </button>
      </section>

      {/* Debugging 
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold">Store Selected Test IDs:</h3>
            <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(selectedTestIds, null, 2)}
            </pre>
            <h3 className="font-semibold mt-2">Selected Biomarkers (Objects):</h3>
            <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(selectedBiomarkers, null, 2)}
            </pre>
        </div>
      */}
    </div>
  );
}
