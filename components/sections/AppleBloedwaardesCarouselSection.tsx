"use client";

import React from "react";
import {
  VitaminCarousel,
  CategoryCard,
  type CategoryCardProps,
} from "@/components/ui/vitamin-card-carousel";

// Data voor de bloedwaardecategorieën
const bloodValueCategoriesData: CategoryCardProps[] = [
  {
    categoryName: "Vitamines",
    bloodValues: [
      "Vitamine A",
      "Vitamine B1",
      "Vitamine B6",
      "Vitamine B11 (Foliumzuur)",
      "Vitamine B12",
      "Vitamine C",
      "Vitamine D",
      "Vitamine E",
      "Vitamine K",
    ],
  },
  {
    categoryName: "Mineralen & Spoorelementen",
    bloodValues: [
      "Calcium",
      "Magnesium",
      "Natrium",
      "Kalium",
      "Chloride",
      "Zink",
      "Selenium",
      "IJzer",
      "Serumijzer",
      "Transferrine",
      "Ferritine",
    ],
  },
  {
    categoryName: "Leverfunctie",
    bloodValues: [
      "ALAT (Alanine-aminotransferase)",
      "ASAT (Aspartaat-aminotransferase)",
      "Gamma-GT (Gamma-glutamyltransferase)",
      "Bilirubine",
      "Alkalische fosfatase",
      "Albumine",
    ],
  },
  {
    categoryName: "Nierfunctie",
    bloodValues: ["Creatinine", "Ureum", "eGFR"],
  },
  {
    categoryName: "Bloedsuiker & Insulinehuishouding",
    bloodValues: ["Nuchtere glucose", "HbA1c", "Insuline", "C-peptide"],
  },
  {
    categoryName: "Bloedcellen / Hematologie",
    bloodValues: [
      "Hemoglobine",
      "Hematocriet",
      "Witte bloedcellen",
      "Bloedplaatjes",
    ],
  },
  {
    categoryName: "Cholesterol & Vetmetabolisme",
    bloodValues: [
      "Totale cholesterol",
      "HDL (High-Density Lipoproteïne)",
      "HDL-cholesterol",
      "LDL (Low-Density Lipoproteïne)",
      "LDL-cholesterol",
      "Triglyceriden",
      "Lipoproteïne(a)",
      "Apolipoproteïne B (ApoB)",
      "Omega-3 Index",
    ],
  },
  {
    categoryName: "Hormonen",
    bloodValues: [
      "Testosteron",
      "Testosteron (totaal en vrij)",
      "SHBG (Sex Hormone Binding Globulin)",
      "Oestrogeen",
      "Progesteron",
      "Cortisol",
      "Luteïniserend Hormoon (LH)",
      "Follikelstimulerend Hormoon (FSH)",
      "Parathyreoïdhormoon (PTH)",
      "TSH",
      "Vrij T3",
      "Vrij T4",
    ],
  },
  {
    categoryName: "Ontstekingsmarkers",
    bloodValues: [
      "CRP (C-reactive protein)",
      "High-sensitivity CRP (hsCRP)",
      "ESR (BSE)",
    ],
  },
  {
    categoryName: "Oxidatieve stress & detox",
    bloodValues: ["Glutathion", "Myoglobine", "Creatine Kinase (CK)"],
  },
  {
    categoryName: "Aminozuren / Collageensynthese",
    bloodValues: ["Glycine", "Proline"],
  },
  {
    categoryName: "Overig",
    bloodValues: [
      "Bloeddruk gerelateerd",
      "Schildklierfunctie",
      "Collageensynthese",
    ],
  },
];

export default function AppleBloedwaardesCarouselSection() {
  const categoryCards = bloodValueCategoriesData.map((category, index) => (
    <CategoryCard key={index} {...category} />
  ));

  return (
    <section className="w-full py-12 md:py-16 bg-zinc-50 overflow-x-clip">
      {/* Sectie titel en beschrijving (binnen content-container) */}
      <div className="content-container mb-8 md:mb-10">
        <h2 className=" text-[rgb(var(--color-black-headings-buttons))]">
          Ontdek welke bloedwaarden je kunt testen
        </h2>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-[rgb(var(--color-paragraaf))] max-w-xl">
          Krijg inzicht in je gezondheid door een breed scala aan beschikbare tests, gegroepeerd per categorie.
        </p>
      </div>

      {/* Carousel container met speciale padding voor linker uitlijning en rechter overflow */}
      {/* var(--max-content-width) is 1200px, theme(spacing.6) is 1.5rem (24px) */}
      <div
        className="pl-[max(theme(spacing.6),calc((100vw-var(--max-content-width))/2+theme(spacing.6)))] pr-[theme(spacing.6)] md:pr-0"
      >
        <VitaminCarousel items={categoryCards} />
      </div>
    </section>
  );
} 