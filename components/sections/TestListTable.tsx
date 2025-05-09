// Dit bestand definieert de TestListTable component.
// Het is een herbruikbare tabel voor het weergeven van een lijst biomarkers, met opties om een test toe te voegen/verwijderen en de prijs te tonen.

"use client";

import React from "react";
import { BiomarkerCatalogItem } from "@/types/biomarker";
import { formatPrice } from "@/logic/priceUtils";
import { CURRENCY_CODE } from "@/logic/constants";

interface TestListTableProps {
  tests: BiomarkerCatalogItem[];
  onToggleTest: (testId: string) => void;
  actionLabel: (testId: string) => string; // Functie om dynamisch label te bepalen, bv "Voeg toe" / "Verwijder"
  isTestActionDisabled?: (testId: string) => boolean; // Optioneel: om de actieknop uit te schakelen
  showPrice?: boolean;
  highlightColor?: string; // Optioneel: bv. een kleur voor "Verwijder" vs "Voeg toe"
}

const TestListTable: React.FC<TestListTableProps> = ({
  tests,
  onToggleTest,
  actionLabel,
  isTestActionDisabled,
  showPrice = true,
  highlightColor = "bg-[rgb(var(--color-black-headings-buttons))] hover:bg-black", // Default is nu zwart
}) => {
  if (!tests || tests.length === 0) {
    return (
      <p className="text-[rgb(var(--color-paragraaf))]">
        Geen testen om weer te geven.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full bg-white rounded-lg shadow-sm">
        <thead className="bg-[rgb(var(--color-white-bg))]">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-[rgb(var(--color-black-headings-buttons))]">
              Biomarker
            </th>
            {showPrice && (
              <th className="px-4 py-3 text-left text-sm font-medium text-[rgb(var(--color-black-headings-buttons))]">
                Prijs
              </th>
            )}
            <th className="px-4 py-3 text-left text-sm font-medium text-[rgb(var(--color-black-headings-buttons))]">
              Actie
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {tests.map((test) => (
            <tr
              key={test.id}
              className="hover:bg-[rgb(var(--color-extra-light-green))] transition-colors duration-150"
            >
              <td className="px-4 py-3">
                <div className="text-sm text-[rgb(var(--color-black-headings-buttons))]">
                  {test.name}
                </div>
                {test.description && (
                  <div className="text-xs text-[rgb(var(--color-paragraaf))] mt-0.5">
                    {test.description}
                  </div>
                )}
              </td>
              {showPrice && (
                <td className="px-4 py-3 whitespace-nowrap text-sm text-[rgb(var(--color-paragraaf))]">
                  {formatPrice(test.price, CURRENCY_CODE)}
                </td>
              )}
              <td className="px-4 py-3 whitespace-nowrap">
                <button
                  onClick={() => onToggleTest(test.id)}
                  disabled={
                    isTestActionDisabled ? isTestActionDisabled(test.id) : false
                  }
                  className={`px-3 py-1.5 text-xs text-white rounded-md transition-all 
                            ${
                              isTestActionDisabled &&
                              isTestActionDisabled(test.id)
                                ? "bg-gray-300 cursor-not-allowed"
                                : `${highlightColor} focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-normal-green))]`
                            }
                            `}
                >
                  {actionLabel(test.id)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestListTable;
