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
  highlightColor = "bg-blue-500 hover:bg-blue-600", // Default Tailwind classes
}) => {
  if (!tests || tests.length === 0) {
    return <p className="text-gray-500">Geen testen om weer te geven.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Biomarker
            </th>
            {showPrice && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prijs
              </th>
            )}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actie
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tests.map((test) => (
            <tr key={test.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {test.name}
                </div>
                {test.description && (
                  <div className="text-xs text-gray-500">
                    {test.description}
                  </div>
                )}
              </td>
              {showPrice && (
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {formatPrice(test.price, CURRENCY_CODE)}
                </td>
              )}
              <td className="px-4 py-3 whitespace-nowrap">
                <button
                  onClick={() => onToggleTest(test.id)}
                  disabled={
                    isTestActionDisabled ? isTestActionDisabled(test.id) : false
                  }
                  className={`px-3 py-1.5 text-xs font-medium text-white rounded-md shadow-sm transition-colors 
                            ${
                              isTestActionDisabled &&
                              isTestActionDisabled(test.id)
                                ? "bg-gray-300 cursor-not-allowed"
                                : `${highlightColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`
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
