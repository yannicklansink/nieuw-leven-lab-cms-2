// Dit bestand bevat de definitie van alle vragen voor de vragenlijst.
// Elke vraag heeft een id, tekst, type (single-select, multi-select, date, email) en antwoordopties.

export enum QuestionType {
  SingleSelect = "single-select",
  MultiSelect = "multi-select",
  Date = "date",
  Email = "email",
  Number = "number", // Voor vragen zoals leeftijd of aantal dagen
  Text = "text", // Voor open vragen indien nodig
}

export interface AnswerOption {
  value: string;
  label: string;
}

export interface Question {
  id: string; // Unieke ID voor de vraag, bv. 'q1', 'q2' etc.
  step: number; // Volgorde nummer van de vraag
  name: string; // Naam van het veld in de store, bv. 'description', 'healthGoals'
  text: string;
  type: QuestionType;
  options?: AnswerOption[]; // Voor single-select en multi-select
  placeholder?: string; // Voor input velden zoals email, date
  validation?: {
    required?: boolean;
    pattern?: RegExp; // Voor email, etc.
    min?: number;
    max?: number;
  };
  subText?: string; // Optionele extra uitleg bij de vraag
}

export const questionnaireQuestions: Question[] = [
  {
    id: "q1",
    step: 1,
    name: "description",
    text: "Welke van deze beschrijvingen past het beste bij jou?",
    type: QuestionType.SingleSelect,
    options: [
      {
        value: "personalized_recommendations",
        label:
          "Ik wil graag wat hulp bij wat ik moet testen – laat me gepersonaliseerde aanbevelingen zien",
      },
      {
        value: "compose_own_test",
        label:
          "Ik weet wat ik wil testen – laat me mijn eigen bloedtest samenstellen",
      },
    ],
  },
  {
    id: "q2",
    step: 2,
    name: "healthGoals",
    text: "Welke van deze gezondheidsdoelen zijn belangrijk voor jou?",
    type: QuestionType.MultiSelect,
    options: [
      { value: "better_sleep", label: "Beter slapen" },
      {
        value: "mood_mental_health",
        label: "Ondersteuning van mijn stemming en mentale gezondheid",
      },
      { value: "weight_management", label: "Mijn gewicht beheersen" },
      { value: "energy_levels", label: "Mijn energieniveau verbeteren" },
      {
        value: "long_term_health",
        label: "Mijn gezondheid op de lange termijn beschermen",
      },
      {
        value: "fitness_performance",
        label: "Mijn fitheid en prestaties optimaliseren",
      },
    ],
  },
  {
    id: "q3",
    step: 3,
    name: "gender",
    text: "Wat was je geboortegeslacht?",
    type: QuestionType.SingleSelect,
    options: [
      { value: "Man", label: "Man" },
      { value: "Vrouw", label: "Vrouw" },
    ],
  },
  {
    id: "q4",
    step: 4,
    name: "intensiveExerciseDays",
    text: "Op hoeveel dagen per week doe je aan intensieve lichaamsbeweging van minstens 10 minuten per keer?",
    type: QuestionType.SingleSelect, // Kan ook Number zijn met min/max validatie
    options: Array.from({ length: 8 }, (_, i) => ({
      value: i.toString(),
      label: i.toString(),
    })),
  },
  {
    id: "q5",
    step: 5,
    name: "strengthTrainingDays",
    text: "Op hoeveel dagen per week doe je aan krachttraining van minstens 10 minuten per keer?",
    type: QuestionType.SingleSelect, // Kan ook Number zijn met min/max validatie
    options: Array.from({ length: 8 }, (_, i) => ({
      value: i.toString(),
      label: i.toString(),
    })),
  },
  {
    id: "q6",
    step: 6,
    name: "sedentaryHours",
    text: "Hoeveel uur per dag breng je gemiddeld zittend door?",
    type: QuestionType.SingleSelect,
    options: [
      { value: "<7.5", label: "Minder dan 7,5 uur" },
      { value: "7.5-9", label: "7,5 – 9 uur" },
      { value: "9-10.5", label: "9 – 10,5 uur" },
      { value: ">10.5", label: "Meer dan 10,5 uur" },
    ],
  },
  {
    id: "q7",
    step: 7,
    name: "diet",
    text: "Welk dieet volg je?",
    type: QuestionType.SingleSelect,
    options: [
      { value: "mix", label: "Geen specifiek dieet – het is een mix" },
      { value: "vegan", label: "Veganistisch" },
      { value: "vegetarian", label: "Vegetarisch" },
      { value: "pescetarian", label: "Pescotarisch" },
      { value: "gluten_free", label: "Glutenvrij" },
      { value: "paleo", label: "Paleo" },
      { value: "calorie_restricted", label: "Caloriebeperkt" },
      { value: "low_carb_high_fat", label: "Low Carb High Fat" },
      { value: "low_carb_other", label: "Low Carb (anders)" },
      { value: "other", label: "Anders" },
    ],
  },
  {
    id: "q8",
    step: 8,
    name: "dietRating",
    text: "Hoe zou je je dieet beoordelen?",
    type: QuestionType.SingleSelect, // Kan ook een slider/number input zijn
    options: Array.from({ length: 11 }, (_, i) => ({
      value: i.toString(),
      label:
        i === 0
          ? "0 – Zeer ongezond"
          : i === 5
          ? "5 – Gemiddeld"
          : i === 10
          ? "10 – Zeer gezond"
          : i.toString(),
    })),
  },
  {
    id: "q9",
    step: 9,
    name: "existingHealthProblems",
    text: "Heb je bestaande gezondheidsproblemen waarmee we rekening moeten houden?",
    type: QuestionType.MultiSelect,
    options: [
      { value: "none", label: "Geen van de onderstaande" },
      { value: "cancer", label: "Kanker" },
      { value: "epilepsy", label: "Epilepsie" },
      { value: "stroke", label: "Beroerte" },
      { value: "asthma", label: "Astma" },
      { value: "chronic_kidney_disease", label: "Chronische nierziekte" },
      { value: "copd", label: "Chronische obstructieve longziekte (COPD)" },
      { value: "celiac_disease", label: "Coeliakie" },
      { value: "crohns_disease", label: "Ziekte van Crohn" },
      { value: "dementia", label: "Dementie" },
      { value: "gout", label: "Jicht" },
      { value: "arrhythmia", label: "Hartritmestoornis" },
      { value: "heart_disease", label: "Hartziekte" },
      { value: "high_blood_pressure", label: "Hoge bloeddruk" },
      { value: "high_cholesterol", label: "Hoog cholesterol" },
      { value: "hiv", label: "Hiv" },
      { value: "ibs", label: "Prikkelbare darm syndroom (PDS)" },
      { value: "liver_disease", label: "Leverziekte" },
      { value: "mental_health_condition", label: "Psychische aandoening" },
      { value: "pcos", label: "Polycysteus-ovariumsyndroom (PCOS)" },
      { value: "prostate_cancer", label: "Prostaatkanker" },
      { value: "rheumatoid_arthritis", label: "Reumatoïde artritis" },
      { value: "ulcerative_colitis", label: "Colitis ulcerosa" },
    ],
  },
  {
    id: "q10",
    step: 10,
    name: "familyHistoryConditions",
    text: "Komt een van de onderstaande aandoeningen in je familie voor?",
    type: QuestionType.MultiSelect,
    options: [
      { value: "none", label: "Geen van de onderstaande" },
      { value: "type_2_diabetes", label: "Type 2 diabetes" },
      { value: "cardiovascular_disease", label: "Hart- en vaatziekten" },
      {
        value: "genetic_high_cholesterol",
        label: "Genetisch verhoogd cholesterol",
      },
    ],
  },
  {
    id: "q11",
    step: 11,
    name: "birthDate", // Moet in store worden opgeslagen als { day, month, year }
    text: "Wat is je geboortedatum?",
    type: QuestionType.Date,
    subText:
      "Deze informatie helpt ons om testen en leefstijlaanpassingen aan te bevelen die passen bij jouw levensfase.",
    placeholder: "DD/MM/YYYY", // Of aparte velden in de UI
  },
  {
    id: "q12",
    step: 12,
    name: "ethnicity",
    text: "Wat is je etniciteit?",
    subText:
      "Etniciteit kan je risico op het ontwikkelen van bepaalde aandoeningen beïnvloeden.",
    type: QuestionType.SingleSelect,
    options: [
      { value: "white", label: "Wit" },
      { value: "indian", label: "Indiaas" },
      { value: "pakistani", label: "Pakistaans" },
      { value: "bangladeshi", label: "Bengaals" },
      { value: "black_caribbean", label: "Zwart Caribisch" },
      { value: "black_african", label: "Zwart Afrikaans" },
      { value: "chinese", label: "Chinees" },
      { value: "other_asian", label: "Anders Aziatisch" },
      { value: "other_ethnic_group", label: "Andere etnische groep" },
      { value: "mixed_ethnicity", label: "Gemengde etniciteit" },
    ],
  },
  {
    id: "q13",
    step: 13,
    name: "email",
    text: "Wat is je e-mailadres?",
    subText:
      "We gebruiken dit om je persoonlijke gezondheidsrapport te sturen en je op de hoogte te houden van je testresultaten en aanbevelingen.",
    type: QuestionType.Email,
    placeholder: "jouwemail@voorbeeld.com",
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
];

// Helper functie om een vraag op te halen op basis van stap nummer
export const getQuestionByStep = (step: number): Question | undefined => {
  return questionnaireQuestions.find((q) => q.step === step);
};

// Helper functie om de naam van het store veld op te halen op basis van stapnummer
export const getQuestionNameByStep = (step: number): string | undefined => {
  const question = getQuestionByStep(step);
  return question?.name;
};

export const TOTAL_QUESTIONS = questionnaireQuestions.length;
