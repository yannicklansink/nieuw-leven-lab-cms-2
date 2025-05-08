// Dit bestand bevat utility functies voor prijsberekeningen en het samenvoegen van biomarker panels.
// Functies zoals mergePanels (dedupliceren van biomarker IDs) en calcTotal (berekenen van de totale prijs) worden hier gedefinieerd.

import { BiomarkerCatalogItem } from "@/types/biomarker";
import { catalog, getBiomarkerById } from "@/logic/catalog";

/**
 * Voegt meerdere arrays van biomarker IDs samen en verwijdert duplicaten.
 * De volgorde van de uiteindelijke array is niet gegarandeerd.
 * @param panels Een array van arrays met biomarker IDs (string[]).
 * @returns Een enkele array met unieke biomarker IDs.
 */
export const mergePanels = (...panels: string[][]): string[] => {
  const allIds = panels.flat();
  return Array.from(new Set(allIds));
};

/**
 * Berekent de totale prijs van een lijst met biomarker IDs.
 * Haalt de prijzen op uit de catalogus (prijzen zijn in centen).
 * @param ids Een array van biomarker IDs.
 * @returns De totale prijs in centen (number).
 */
export const calcTotal = (ids: string[]): number => {
  let total = 0;
  for (const id of ids) {
    const item = getBiomarkerById(id);
    if (item && typeof item.price === "number") {
      total += item.price;
    }
  }
  return total;
};

/**
 * Formatteert een prijs in centen naar een leesbare string met valutasymbool.
 * @param amountInCents De prijs in centen.
 * @param currencyCode De ISO 4217 valutacode (bijv. "EUR", "USD").
 * @param locale De locale voor formattering (bijv. "nl-NL", "en-US").
 * @returns Een geformatteerde prijsstring (bijv. "€25,00").
 */
export const formatPrice = (
  amountInCents: number,
  currencyCode: string = "EUR",
  locale: string = "nl-NL"
): string => {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};
