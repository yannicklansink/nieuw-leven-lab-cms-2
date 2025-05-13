import Image from "next/image";
import Button from "../elements/Button";

// Lab markers gebaseerd op de verstrekte HTML
const labMarkers = [
  "Heart",
  "Homocysteine",
  "Albumin / Globulin Ratio",
  "BUN / Creatinine Ratio",
  "Blood Urea Nitrogen (BUN)",
  "Creatinine",
  "Estimated Glomerular Filtration Rate (eGFR)",
  "Globulin",
  "Calcium",
  "Potassium",
  "Apolipoprotein B (ApoB)",
  "Cholesterol / HDL Ratio",
  "Creatine Kinase (CK)",
  "HDL Cholesterol",
  "LDL Cholesterol",
  "Lipoprotein (a)",
  "Total Cholesterol",
  "Triglycerides",
  "VLDL Cholesterol",
  "Alanine Aminotransferase (ALT)",
  "Albumin",
  "Alkaline Phosphatase (ALP)",
  "Aspartate Transaminase (AST)",
  "Gamma-glutamyl Transferase (GGT)",
  "Total Bilirubin",
  "Total Protein",
  "Sodium",
  "Glucose",
  "Hemoglobin A1c (HbA1c)",
  "Insulin",
  "Uric Acid",
  "Hematocrit",
  "Hemoglobin",
  "Mean Corpuscular Hemoglobin Concentration (MCHC)",
  "Mean Corpuscular Volume (MCV)",
  "Mean Platelet Volume (MPV)",
  "Platelet Count",
  "Red Blood Cell (RBC) Count",
  "Red Cell Distribution Width (RDW)",
  "Total CO2",
  "Mean Corpuscular Hemoglobin (MCH)",
  "Follicle Stimulating Hormone (FSH)",
  "Luteinizing Hormone (LH)",
  "Cortisol",
  "DHEA-Sulfate",
  "Estradiol (E2)",
  "Sex Hormone Binding Globulin (SHBG)",
  "Testosterone, Free",
  "Testosterone, Total",
  "Chloride",
  "Mercury",
  "Basophils",
  "Eosinophils",
  "Lymphocytes",
  "Monocytes",
  "Neutrophils",
  "White Blood Cells (WBC)",
  "High-Sensitivity C-Reactive Protein (hsCRP)",
  "Anti-Nuclear Antibodies (ANA)",
  "Erythrocyte Sedimentation Rate (ESR)",
  "Biological Age",
  "Health Score",
  "Pace of Aging",
  "Insulin-like Growth Factor 1 (IGF-1)",
  "Progesterone",
  "Prostate Specific Antigen (PSA)",
  "Arachidonic Acid",
  "Arachidonic Acid/EPA Ratio",
  "DHA",
  "DPA",
  "EPA",
  "Folate (Folic Acid)",
  "Iron",
  "Iron % Saturation",
  "Iron Binding Capacity",
  "Linoleic Acid",
  "Magnesium",
  "Vitamin B12 (MMA)",
  "Vitamin D",
  "Ferritin",
  "Thyroglobulin Antibodies (TgAb)",
  "Thyroid Peroxidase (TPO)",
  "Thyroid-Stimulating Hormone (TSH)",
  "Thyroxine (T4), Free",
  "Triiodothyronine (T3), Free",
  "Prolactin",
  "Leptin",
];

export default function SuperpowerTestSection() {
  return (
    <section
      className="relative min-h-[70vh] md:min-h-[60vh] w-full flex flex-col items-center justify-start overflow-hidden text-white pt-8 md:pt-12 mt-4 md:mt-6"
      // Oranje gradient achtergrond, Apple-stijl
      style={{
        background:
          "linear-gradient(180deg, rgb(var(--color-light-green)) 0%, rgb(var(--color-normal-green)) 30%, rgb(var(--color-normal-green)) 70%, rgb(var(--color-dark-green)) 100%)",
        // "linear-gradient(180deg, #F97316 0%, #EA580C 30%, #C2410C 70%, #9A3412 100%)",
      }}
    >
      {/* Kopteksten Wrapper met content-container */}
      <div className="content-container w-full">
        <div className="relative z-30 text-center mb-2 md:mb-4 mt-8 ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Jouw test, <br className="hidden sm:block" />
            10x beter dan een jaarlijkse controle
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-green-100/80 mt-4 md:mt-6 max-w-3xl mx-auto">
            Test labmarkers voor hart, hormonen, lever, ontsteking en meer
          </p>
          <div className="mt-8">
            <Button href="/questionnaire/1" variant="primary">
              Ontwerp mijn test en leef beter
            </Button>
          </div>
        </div>
      </div>
      {/* Centrale Content: Afbeelding en Markers */}
      <div className="relative w-full md:max-w-4xl flex justify-center items-end mx-auto flex-grow">
        {/* Achtergrond Lab Markers */}
        <div
          className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center z-10 opacity-60 md:opacity-50"
          style={{
            maskImage:
              "radial-gradient(ellipse 60% 50% at center, black 30%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at center, black 30%, transparent 70%)",
          }}
        >
          <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1.5 px-2 max-h-[70vh] overflow-hidden">
            {labMarkers.map((marker, index) => (
              <p
                key={index}
                className="font-mono text-[9px] sm:text-[10px] md:text-xs text-white/30 whitespace-nowrap select-none"
              >
                {marker}
              </p>
            ))}
          </div>
        </div>
        {/* Vrouw Afbeelding - hogere z-index */}
        <div className="relative z-20 pointer-events-none">
          <Image
            src="/images/other/models/woman-dark.png"
            alt="Silhouet van een vrouw, symbool voor gezondheid en vitaliteit"
            width={700}
            height={1050}
            className="object-contain max-h-[75vh] sm:max-h-[75vh] md:max-h-[65vh] drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
