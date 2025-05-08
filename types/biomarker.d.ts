// Dit bestand definieert de TypeScript interface voor een biomarker catalogus item.
// Het specificeert de structuur van elk item in de catalogus, inclusief id, naam, prijs en Stripe prijs-ID.

export interface BiomarkerCatalogItem {
  id: string; // Unieke identifier voor de biomarker, bv. "VITD", "HSCRP"
  name: string; // Volledige naam van de biomarker, bv. "Vitamine D", "hs-CRP"
  price: number; // Prijs in centen (integer) om afrondingsfouten te voorkomen
  stripePriceId: string; // De ID van de prijs in Stripe, kan verschillen per omgeving
  // Optioneel: extra velden zoals categorie, beschrijving, etc.
  category?: string;
  description?: string;
}
