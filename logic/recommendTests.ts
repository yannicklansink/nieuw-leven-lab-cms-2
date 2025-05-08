// Dit bestand definieert de rule-engine voor het aanbevelen van biomarkers.
// Het bevat individuele regelfuncties en de hoofdfunctie `recommend` die antwoorden van de vragenlijst omzet naar een lijst van BiomarkerCatalogItem objecten.

import { QuestionnaireAnswers, Gender, DietType } from "@/types/questionnaire";
import { BiomarkerCatalogItem } from "@/types/biomarker";
import { catalog, getBiomarkerById } from "@/logic/catalog";
import { BASE_PANEL } from "@/logic/constants";
import { mergePanels } from "@/logic/priceUtils";

// Type definitie voor een regelfunctie
// Een regelfunctie neemt antwoorden en retourneert een array van biomarker IDs (strings)
export type RuleFn = (answers: QuestionnaireAnswers) => string[];

// --- Individuele Regelfuncties ---

const ruleGoalEnergy: RuleFn = (answers) => {
  return answers.healthGoals?.includes("energy_levels")
    ? ["B12", "IRON", "FERRITIN", "HBA1C"]
    : [];
};

const ruleGoalFitness: RuleFn = (answers) => {
  return answers.healthGoals?.includes("fitness_performance")
    ? ["TESTOSTERONE", "CK", "GLYCINE", "MAGNESIUM"]
    : [];
};

const ruleGenderFemale: RuleFn = (answers) => {
  // Gebruik de string waarde "Vrouw" zoals gedefinieerd in de Gender enum in questionnaire.d.ts
  return answers.gender === Gender.Female
    ? ["OESTROGEN", "PROGESTERONE", "LH", "FSH"]
    : [];
};

const ruleEthnicityBlackAfrican: RuleFn = (answers) => {
  return answers.ethnicity === "black_african" ? ["FERRITIN"] : [];
};

const ruleDietVeganVegetarian: RuleFn = (answers) => {
  // Gebruik de string waardes zoals gedefinieerd in de DietType enum
  const isVeganOrVegetarian =
    answers.diet === DietType.Vegan || answers.diet === DietType.Vegetarian;
  return isVeganOrVegetarian ? ["B12", "IRON", "FERRITIN", "ZINC"] : [];
};

const ruleDietLowCarbHighFat: RuleFn = (answers) => {
  return answers.diet === DietType.LowCarbHighFat
    ? ["LDL", "TRIGLYCERIDES", "HDL", "LPA"]
    : [];
};

const ruleSedentaryTime: RuleFn = (answers) => {
  return answers.sedentaryHours === ">10.5" ? ["HSCRP", "HBA1C"] : [];
};

const calculateAge = (birthDate?: {
  day?: number;
  month?: number;
  year?: number;
}): number | undefined => {
  if (
    !birthDate ||
    birthDate.year === undefined ||
    birthDate.month === undefined ||
    birthDate.day === undefined
  ) {
    return undefined;
  }
  const today = new Date();
  const birth = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const ruleAgeOver45: RuleFn = (answers) => {
  const age = calculateAge(answers.birthDate);
  if (age === undefined || age <= 45) return [];

  const tests: string[] = ["SHBG", "EGFR"];
  if (answers.gender === Gender.Male) {
    tests.push("PSA");
  }
  return tests;
};

const ruleFamilyHistoryCardio: RuleFn = (answers) => {
  return answers.familyHistoryConditions?.includes("cardiovascular_disease")
    ? ["LPA", "LDL", "HSCRP"]
    : [];
};

const ruleHealthProblemHighBloodPressure: RuleFn = (answers) => {
  return answers.existingHealthProblems?.includes("high_blood_pressure")
    ? ["SODIUM", "POTASSIUM", "EGFR", "CREATININE", "UREUM"]
    : [];
};

const ruleGoalMentalHealth: RuleFn = (answers) => {
  return answers.healthGoals?.includes("mood_mental_health")
    ? ["VITD", "B6", "MAGNESIUM"]
    : [];
};

const ruleLowExercise: RuleFn = (answers) => {
  const intensiveDays =
    typeof answers.intensiveExerciseDays === "string"
      ? parseInt(answers.intensiveExerciseDays)
      : answers.intensiveExerciseDays;
  const strengthDays =
    typeof answers.strengthTrainingDays === "string"
      ? parseInt(answers.strengthTrainingDays)
      : answers.strengthTrainingDays;

  const lowIntensive = intensiveDays !== undefined && intensiveDays < 2;
  const lowStrength = strengthDays !== undefined && strengthDays < 2;

  return lowIntensive || lowStrength
    ? ["HBA1C", "TRIGLYCERIDES", "INSULIN"]
    : [];
};

// --- Rule Set ---
const rules: RuleFn[] = [
  ruleGoalEnergy,
  ruleGoalFitness,
  ruleGenderFemale,
  ruleEthnicityBlackAfrican,
  ruleDietVeganVegetarian,
  ruleDietLowCarbHighFat,
  ruleSedentaryTime,
  ruleAgeOver45,
  ruleFamilyHistoryCardio,
  ruleHealthProblemHighBloodPressure,
  ruleGoalMentalHealth,
  ruleLowExercise,
];

// --- Hoofd recommend functie ---

/**
 * Genereert een lijst van aanbevolen biomarkers op basis van de antwoorden van de gebruiker.
 * @param answers De antwoorden van de gebruiker op de vragenlijst.
 * @param currentCatalog De volledige catalogus van beschikbare biomarkers.
 * @param basePanelIDs Een array van IDs voor biomarkers die altijd inbegrepen moeten zijn.
 * @returns Een array van BiomarkerCatalogItem objecten.
 */
export const recommend = (
  answers: QuestionnaireAnswers,
  currentCatalog: BiomarkerCatalogItem[] = catalog, // Maakt het testbaar met een mock catalogus
  basePanelIDs: string[] = BASE_PANEL // Maakt het testbaar met een mock base panel
): BiomarkerCatalogItem[] => {
  // 1. Pas alle regels toe en verzamel de voorgestelde biomarker IDs
  const extraBiomarkerIDs = rules.flatMap((rule) => rule(answers));

  // 2. Voeg de basis panel IDs toe en dedupliceer de lijst
  const finalBiomarkerIDs = mergePanels(basePanelIDs, extraBiomarkerIDs);

  // 3. Haal de volledige biomarker objecten op uit de catalogus
  const recommendedBiomarkers = finalBiomarkerIDs
    .map((id) => {
      // Gebruik getBiomarkerById die zoekt in de meegegeven currentCatalog
      return currentCatalog.find((item) => item.id === id);
    })
    .filter((item) => item !== undefined) as BiomarkerCatalogItem[]; // Filter undefined items en assert type

  return recommendedBiomarkers;
};
