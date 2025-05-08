// Deze file definieert de Zustand store voor het beheren van de status van de vragenlijst.
// Het gebruikt persist middleware om antwoorden in sessionStorage op te slaan en bevat acties om antwoorden te zetten en te resetten.
import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import type { QuestionnaireAnswers } from "@/types/questionnaire";

interface QuestionnaireState {
  answers: QuestionnaireAnswers;
  setAnswer: <K extends keyof QuestionnaireAnswers>(
    questionId: K,
    answer: QuestionnaireAnswers[K]
  ) => void;
  resetAnswers: () => void;
  selectedTests: string[];
  setRecommendedTests: (tests: string[]) => void;
  toggleTest: (testId: string) => void;
}

const initialAnswers: QuestionnaireAnswers = {
  // Initialiseer alle velden van QuestionnaireAnswers hier indien nodig
  // Voor nu laten we het leeg, de vragen vullen dit aan.
  description: undefined,
  healthGoals: [],
  gender: undefined,
  intensiveExerciseDays: undefined,
  strengthTrainingDays: undefined,
  sedentaryHours: undefined,
  diet: undefined,
  dietRating: undefined,
  existingHealthProblems: [],
  familyHistoryConditions: [],
  birthDate: undefined,
  ethnicity: undefined,
  email: undefined,
};

const dummyStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set, get) => ({
      answers: initialAnswers,
      selectedTests: [],

      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: answer,
          },
        })),

      resetAnswers: () => set({ answers: initialAnswers, selectedTests: [] }),

      setRecommendedTests: (tests) => set({ selectedTests: tests }),

      toggleTest: (testId) =>
        set((state) => {
          const currentSelectedTests = state.selectedTests;
          const testIndex = currentSelectedTests.indexOf(testId);
          if (testIndex > -1) {
            // Test is al geselecteerd, dus verwijder het
            return {
              selectedTests: [
                ...currentSelectedTests.slice(0, testIndex),
                ...currentSelectedTests.slice(testIndex + 1),
              ],
            };
          } else {
            // Test is nog niet geselecteerd, dus voeg het toe
            return { selectedTests: [...currentSelectedTests, testId] };
          }
        }),
    }),
    {
      name: "questionnaire-storage", // naam van de storage key
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? sessionStorage : dummyStorage
      ),
    }
  )
);
