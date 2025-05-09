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
import SectionSubheading from "@/components/elements/SpanSubheadingGreen";

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

  // Effect toevoegen om te controleren of we een tussenstap hebben overgeslagen
  useEffect(() => {
    // Check of de huidige stap 4, 7 of 10 is (na een milestone)
    // en of de vorige vraag is beantwoord
    const isMilestoneStep = [4, 7, 10].includes(step);

    if (isMilestoneStep) {
      const previousStep = step - 1;
      const previousQuestionName = getQuestionByStep(previousStep)?.name;

      // Als de vorige vraag is beantwoord maar gebruiker heeft geen milestone-pagina gezien,
      // dan mag hij direct doorgaan (bijv. bij terug navigeren en dan weer vooruit)
      if (
        previousQuestionName &&
        answers[previousQuestionName as keyof QuestionnaireAnswers] !==
          undefined
      ) {
        // Hier kunnen we evt. een state toevoegen om bij te houden welke milestones al zijn gezien
        // Voor nu doen we niks speciaals
      }
    }
  }, [step, answers]);

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

    // Controleer of dit vraag 1 is en het antwoord "compose_own_test" is
    if (step === 1 && answers.description === "compose_own_test") {
      router.push(`/questionnaire/milestone/compose`);
      return;
    }

    // Controleer of we naar een milestone moeten navigeren
    if (step === 3 || step === 6 || step === 9) {
      router.push(`/questionnaire/milestone/${step}`);
    } else if (step < TOTAL_QUESTIONS) {
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
      <div className="flex justify-center items-center min-h-screen bg-[rgb(var(--color-white-bg))]">
        <p>Vraag laden...</p>
      </div>
    );
  }

  const currentAnswerValue =
    answers[currentQuestion.name as keyof QuestionnaireAnswers];

  return (
    <main className="bg-[rgb(var(--color-white-bg))] py-6 md:py-12 min-h-screen">
      <div className="content-container">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <SectionSubheading
              spanText={`Stap ${step} van ${TOTAL_QUESTIONS}`}
              headingText={currentQuestion.text}
            />

            {/* Progress bar - restyled met Nieuw Leven Lab kleuren */}
            <div className="w-full bg-[rgb(var(--color-extra-light-green))] rounded-full h-2 mt-3">
              <div
                className="bg-[rgb(var(--color-normal-green))] h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / TOTAL_QUESTIONS) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-[rgb(var(--color-white-bg))] rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <QuestionComponent
              question={currentQuestion}
              currentAnswer={currentAnswerValue}
              onAnswerChange={handleAnswerChange}
            />
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className="px-6 py-2 rounded-lg border border-[rgb(var(--color-normal-green))] text-[rgb(var(--color-black-headings-buttons))] hover:bg-[rgb(var(--color-extra-light-green))] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Naar vorige vraag"
            >
              Vorige
            </button>
            <button
              onClick={handleNext}
              disabled={!isAnswered()}
              className={`
                px-6 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  step === TOTAL_QUESTIONS
                    ? "group bg-gradient-to-r from-[rgb(var(--color-dark-green))] to-[rgb(var(--color-normal-green))] text-white font-medium border-2 border-[rgb(var(--color-normal-green))] shadow-lg hover:shadow-[0_8px_16px_rgba(var(--color-dark-green),0.3)] hover:translate-y-[-2px] hover:scale-[1.02] relative overflow-hidden after:absolute after:inset-0 after:bg-white after:opacity-0 after:hover:opacity-10 after:transition-opacity"
                    : "btn-primary shadow-md hover:shadow"
                }
              `}
              aria-label={
                step === TOTAL_QUESTIONS
                  ? "Bekijk aanbevelingen"
                  : "Naar volgende vraag"
              }
            >
              {step === TOTAL_QUESTIONS ? (
                <span className="flex items-center justify-center">
                  Bekijk aanbevelingen
                  <svg
                    className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              ) : (
                "Volgende"
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
