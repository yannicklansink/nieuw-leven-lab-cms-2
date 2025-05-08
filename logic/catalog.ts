// Dit bestand importeert de biomarker catalogus data uit catalog.json.
// Het exporteert de data als een getypeerde const array voor gebruik in de applicatie.

import catalogData from "@/data/catalog.json";
import { BiomarkerCatalogItem } from "@/types/biomarker";

export const catalog: BiomarkerCatalogItem[] =
  catalogData as BiomarkerCatalogItem[];

// Helper functie om een biomarker op ID te vinden
export const getBiomarkerById = (
  id: string
): BiomarkerCatalogItem | undefined => {
  return catalog.find((item) => item.id === id);
};
