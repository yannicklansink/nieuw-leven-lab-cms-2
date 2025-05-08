// Dit bestand bevat constante waarden die in de applicatie worden gebruikt.
// Momenteel definieert het BASE_PANEL, een array met de ID's van de 5 verplichte biomarkers.

// De ID's moeten overeenkomen met de ID's in catalog.json
export const BASE_PANEL: string[] = [
  "APOB", // Apolipoproteïne B (ApoB)
  "HSCRP", // hsCRP (High-sensitivity C-reactive protein)
  "INSULIN", // Insuline (nuchter)
  "OMEGA3", // Omega-3 Index
  "FT3", // Vrij T3 (actieve schildklierhormoon)
];

// Andere constanten kunnen hier worden toegevoegd, bijvoorbeeld valuta, API keys (hoewel .env beter is voor keys)
export const CURRENCY_CODE = "EUR";
export const CURRENCY_SYMBOL = "€";
