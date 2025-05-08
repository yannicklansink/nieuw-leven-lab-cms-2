// Dit bestand definieert de TypeScript typen en interfaces voor de vragenlijstdata.
// Het bevat enums voor opties zoals geslacht en dieet, en de hoofdinterface QuestionnaireAnswers.

// Enum voor geboortegeslacht
export enum Gender {
  Male = "Man",
  Female = "Vrouw",
}

// Enum voor dieettypes (voorbeeld, kan uitgebreid worden)
export enum DietType {
  None = "Geen specifiek dieet – het is een mix",
  Vegan = "Veganistisch",
  Vegetarian = "Vegetarisch",
  Pescetarian = "Pescotarisch",
  GlutenFree = "Glutenvrij",
  Paleo = "Paleo",
  CalorieRestricted = "Caloriebeperkt",
  LowCarbHighFat = "Low Carb High Fat",
  LowCarbOther = "Low Carb (anders)",
  Other = "Anders",
}

// Interface voor de antwoorden op de vragenlijst
export interface QuestionnaireAnswers {
  // Vraag 1: Beschrijving
  description?: string; // Optioneel, afhankelijk van de implementatie

  // Vraag 2: Gezondheidsdoelen (multiselect)
  healthGoals?: string[];

  // Vraag 3: Geboortegeslacht
  gender?: Gender;

  // Vraag 4: Dagen intensieve lichaamsbeweging
  intensiveExerciseDays?: number; // 0-7

  // Vraag 5: Dagen krachttraining
  strengthTrainingDays?: number; // 0-7

  // Vraag 6: Uren zittend per dag
  sedentaryHours?: string; // "Minder dan 7,5 uur", "7,5 – 9 uur", etc.

  // Vraag 7: Dieet
  diet?: DietType;

  // Vraag 8: Beoordeling dieet
  dietRating?: number; // 0-10

  // Vraag 9: Bestaande gezondheidsproblemen (multiselect)
  existingHealthProblems?: string[];

  // Vraag 10: Familieaandoeningen (multiselect)
  familyHistoryConditions?: string[];

  // Vraag 11: Geboortedatum
  birthDate?: {
    day?: number;
    month?: number;
    year?: number;
  };

  // Vraag 12: Etniciteit
  ethnicity?: string;

  // Vraag 13: E-mailadres
  email?: string;
}

// Je kunt hier meer specifieke enums en types toevoegen als dat nodig is.
