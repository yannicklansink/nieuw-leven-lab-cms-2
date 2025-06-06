// Dit bestand definieert de Question component.
// Het is verantwoordelijk voor het renderen van een enkele vraag uit de vragenlijst, inclusief de vraagtekst, subtekst en de juiste inputvelden (CheckboxCard, DateInput, EmailInput etc.) gebaseerd op het vraagtype.

"use client";

import React from "react";
import {
  Question as QuestionType,
  AnswerOption,
  QuestionType as QType,
} from "@/data/questions";
import { QuestionnaireAnswers } from "@/types/questionnaire";
import CheckboxCard from "@/components/elements/CheckboxCard";

interface QuestionProps {
  question: QuestionType;
  currentAnswer: any; // Kan string, string[], {day,month,year} etc. zijn
  onAnswerChange: (
    questionName: keyof QuestionnaireAnswers,
    value: any
  ) => void;
}

const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  currentAnswer,
  onAnswerChange,
}) => {
  const handleSingleSelectChange = (value: string) => {
    onAnswerChange(question.name as keyof QuestionnaireAnswers, value);
  };

  const handleMultiSelectChange = (value: string) => {
    const currentValues = (currentAnswer as string[]) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onAnswerChange(question.name as keyof QuestionnaireAnswers, newValues);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simpele implementatie, kan uitgebreid worden met aparte day/month/year inputs
    // Of gebruik een date picker component
    const [year, month, day] = e.target.value.split("-");
    onAnswerChange(question.name as keyof QuestionnaireAnswers, {
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(question.name as keyof QuestionnaireAnswers, e.target.value);
  };

  // Functie om de geboortedatum string te formatteren voor de input type="date"
  const formatDateForInput = (
    dateObj: { day?: number; month?: number; year?: number } | undefined
  ): string => {
    if (
      !dateObj ||
      dateObj.year === undefined ||
      dateObj.month === undefined ||
      dateObj.day === undefined
    )
      return "";
    const month = dateObj.month.toString().padStart(2, "0");
    const day = dateObj.day.toString().padStart(2, "0");
    return `${dateObj.year}-${month}-${day}`;
  };

  return (
    <div>
      {/* <h2 className="text-xl md:text-2xl font-medium text-[rgb(var(--color-black-headings-buttons))] mb-4">
        {question.text}
      </h2> */}
      {question.subText && (
        <p className="text-sm text-[rgb(var(--color-paragraaf-secondary))] mb-6">
          {question.subText}
        </p>
      )}

      <div className="space-y-2">
        {question.type === QType.SingleSelect &&
          question.options?.map((option) => (
            <CheckboxCard
              key={option.value}
              id={`${question.id}-${option.value}`}
              name={question.id} // Zorgt voor radio button gedrag
              label={option.label}
              value={option.value}
              checked={currentAnswer === option.value}
              onChange={handleSingleSelectChange}
              type="radio"
            />
          ))}

        {question.type === QType.MultiSelect &&
          question.options?.map((option) => (
            <CheckboxCard
              key={option.value}
              id={`${question.id}-${option.value}`}
              label={option.label}
              value={option.value}
              checked={
                (currentAnswer as string[])?.includes(option.value) || false
              }
              onChange={handleMultiSelectChange}
              type="checkbox"
            />
          ))}

        {question.type === QType.Date && (
          <input
            type="date"
            value={formatDateForInput(currentAnswer)}
            onChange={handleDateChange}
            placeholder={question.placeholder || "DD/MM/YYYY"}
            className="form-input w-full"
            aria-label="Geboortedatum"
          />
        )}

        {question.type === QType.Email && (
          <input
            type="email"
            value={currentAnswer || ""}
            onChange={handleInputChange}
            placeholder={question.placeholder || "jouwemail@voorbeeld.com"}
            className="form-input w-full"
            required={question.validation?.required}
            pattern={question.validation?.pattern?.source}
            aria-label="E-mailadres"
          />
        )}

        {/* Voeg hier andere vraagtypes toe zoals Number, Text etc. indien nodig */}
        {(question.type === QType.Number ||
          (question.type === QType.SingleSelect &&
            question.name.includes("Days"))) &&
          !question.options && ( // Als er al options zijn (zoals bij q4, q5), gebruik die dan
            <input
              type="number"
              value={currentAnswer || ""}
              onChange={handleInputChange}
              placeholder={question.placeholder || "Voer een getal in"}
              min={question.validation?.min}
              max={question.validation?.max}
              className="form-input w-full"
              required={question.validation?.required}
              aria-label="Numerieke waarde"
            />
          )}
      </div>
    </div>
  );
};

export default QuestionComponent;
