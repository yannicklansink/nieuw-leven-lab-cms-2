// Deze pagina component ([step]/page.tsx) is verantwoordelijk voor het dynamisch weergeven van een specifieke vraag in de vragenlijst.
// Het haalt de huidige stap uit de URL, laadt de bijbehorende vraagdata, en gebruikt de QuestionComponent om deze te tonen. Ook beheert het navigatie en het opslaan van antwoorden in de Zustand store.

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuestionnaireStore } from "@/hooks/useQuestionnaireStore";
import {
  getQuestionByStep,
  TOTAL_QUESTIONS,
  Question as QuestionInterface,
  QuestionType,
} from "@/data/questions";
import QuestionComponent from "@/components/sections/Question";
import { QuestionnaireAnswers } from "@/types/questionnaire";
import { recommend } from "@/logic/recommendTests";
import { BiomarkerCatalogItem } from "@/types/biomarker";
import { catalog } from "@/logic/catalog";
import { BASE_PANEL } from "@/logic/constants";

export default function QuestionnaireStepPage() {
  const router = useRouter();
  const params = useParams();
  const step = parseInt(params.step as string, 10);

  const answers = useQuestionnaireStore((state) => state.answers);
  const setAnswer = useQuestionnaireStore((state) => state.setAnswer);
  const resetAnswers = useQuestionnaireStore((state) => state.resetAnswers);
  const setRecommendedTests = useQuestionnaireStore(
    (state) => state.setRecommendedTests
  );

  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Effect om de vraag te laden op basis van de stap
  useEffect(() => {
    const questionData = getQuestionByStep(step);
    if (questionData) {
      setCurrentQuestion(questionData);
    } else {
      // Ongeldige stap, stuur gebruiker naar de eerste vraag of een foutpagina
      router.replace("/questionnaire/1");
    }
    setIsLoading(false);
  }, [step, router]);

  // Deep-link guard: als de gebruiker op een latere stap landt zonder eerdere antwoorden,
  // stuur ze dan terug naar de eerste vraag.
  // Dit is een simpele check; kan uitgebreid worden om te checken of ALLE voorgaande verplichte vragen zijn beantwoord.
  useEffect(() => {
    if (step > 1 && !answers.description) {
      // Checkt alleen de eerste vraag voor nu.
      // Check of er uberhaupt antwoorden zijn, behalve voor de eerste vraag
      const hasPreviousAnswers = Object.values(answers).some((answer) =>
        Array.isArray(answer) ? answer.length > 0 : answer !== undefined
      );
      if (!hasPreviousAnswers && step !== 1) {
        // console.log("Geen antwoorden gevonden, terug naar start of eerste vraag.");
        // resetAnswers(); // Optioneel: reset alle antwoorden
        // router.replace("/questionnaire/1");
      }
    }
  }, [step, answers, router, resetAnswers]);

  const handleAnswerChange = (
    questionName: keyof QuestionnaireAnswers,
    value: any
  ) => {
    setAnswer(questionName, value);
  };

  const isAnswered = () => {
    if (!currentQuestion) return false;
    const answer = answers[currentQuestion.name as keyof QuestionnaireAnswers];
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    if (typeof answer === "object" && answer !== null) {
      // Voor geboortedatum {day, month, year}
      const dateAnswer = answer as {
        day?: number;
        month?: number;
        year?: number;
      };
      return (
        dateAnswer.day !== undefined &&
        dateAnswer.month !== undefined &&
        dateAnswer.year !== undefined
      );
    }
    return answer !== undefined && answer !== "";
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    if (
      currentQuestion.type === QuestionType.Email &&
      currentQuestion.validation?.pattern
    ) {
      const emailValue = answers[
        currentQuestion.name as keyof QuestionnaireAnswers
      ] as string;
      if (emailValue && !currentQuestion.validation.pattern.test(emailValue)) {
        alert("Voer een geldig e-mailadres in.");
        return;
      }
    }

    if (step < TOTAL_QUESTIONS) {
      router.push(`/questionnaire/${step + 1}`);
    } else {
      // Laatste vraag beantwoord, verwerk aanbevelingen
      console.log("Alle antwoorden voor aanbeveling:", answers);
      const recommendedItems: BiomarkerCatalogItem[] = recommend(
        answers,
        catalog,
        BASE_PANEL
      );
      const recommendedItemIds = recommendedItems.map((item) => item.id);
      setRecommendedTests(recommendedItemIds);
      console.log("Aanbevolen test IDs opgeslagen:", recommendedItemIds);
      router.push("/confirm"); // Navigeer naar de bevestigingspagina
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      router.push(`/questionnaire/${step - 1}`);
    }
  };

  if (isLoading || !currentQuestion) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Vraag laden...</p>
      </div>
    );
  }

  const currentAnswerValue =
    answers[currentQuestion.name as keyof QuestionnaireAnswers];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-500">
            Vraag {step} van {TOTAL_QUESTIONS}
          </p>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / TOTAL_QUESTIONS) * 100}%` }}
            ></div>
          </div>
        </div>

        <QuestionComponent
          question={currentQuestion}
          currentAnswer={currentAnswerValue}
          onAnswerChange={handleAnswerChange}
        />

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={step === 1}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Vorige
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered()} // Schakel uit als er geen antwoord is geselecteerd
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            {step === TOTAL_QUESTIONS ? "Bekijk aanbevelingen" : "Volgende"}
          </button>
        </div>

        {/* Debugging: Toon huidige antwoorden in de store 
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold">Huidige antwoorden in store:</h3>
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(answers, null, 2)}
          </pre>
          <h3 className="font-semibold mt-2">Huidige geselecteerde testen:</h3>
           <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(useQuestionnaireStore.getState().selectedTests, null, 2)} 
          </pre>
        </div>
        */}
      </div>
    </div>
  );
}
