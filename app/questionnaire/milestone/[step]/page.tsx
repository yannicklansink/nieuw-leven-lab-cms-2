"use client";

import React from "react";
import { useParams } from "next/navigation";
import QuestionnaireMilestone from "@/components/sections/QuestionnaireMilestone";
import { TOTAL_QUESTIONS } from "@/data/questions";

// Type definities voor de milestone configuratie
type MilestoneLayout = "carousel" | "card" | "preview" | "custom";

interface BaseMilestoneConfig {
  nextStep: number;
  heading: string;
  subheading: string;
  bulletPoints: string[];
  layout: MilestoneLayout;
}

interface CardMilestoneConfig extends BaseMilestoneConfig {
  layout: "card";
  cardText: string;
  cardImage?: string;
}

interface PreviewMilestoneConfig extends BaseMilestoneConfig {
  layout: "preview";
}

interface CarouselMilestoneConfig extends BaseMilestoneConfig {
  layout: "carousel";
}

interface CustomMilestoneConfig extends BaseMilestoneConfig {
  layout: "custom";
}

type MilestoneConfig =
  | CarouselMilestoneConfig
  | CardMilestoneConfig
  | PreviewMilestoneConfig
  | CustomMilestoneConfig;

// Configuratie voor elke milestone
const milestoneConfig: Record<string, MilestoneConfig> = {
  "3": {
    nextStep: 4,
    heading: "Geweldig! Je hebt het eerste deel afgerond",
    subheading:
      "In het volgende deel gaan we vragen stellen over je lichaamsbeweging en leefstijl om een beter beeld te krijgen van je gezondheidssituatie.",
    bulletPoints: [
      "We hebben nu informatie over je basisgegevens",
      "De volgende vragen gaan over je lichaamsbeweging",
      "Dit helpt ons om je gepersonaliseerde biomarkers te bepalen",
    ],
    layout: "carousel",
  },
  "6": {
    nextStep: 7,
    heading: "Je vordert goed! Je bent halverwege, ga verder!",
    subheading:
      "Nu gaan we vragen stellen over je voedingspatroon en dieet om je aanbevelingen verder te verfijnen.",
    bulletPoints: [
      "We hebben nu informatie over je bewegingspatroon",
      "De volgende vragen gaan over je voedingsgewoonten",
      "Hiermee kunnen we een volledig gepersonaliseerd testpakket samenstellen",
    ],
    layout: "card",
    cardText: "Optimaliseer jouw persoonlijke score in de app",
  },
  "9": {
    nextStep: 10,
    heading: "Bijna klaar! Laatste deel",
    subheading:
      "Tot slot stellen we nog enkele vragen over je medische geschiedenis en persoonlijke gegevens om je bloedtest optimaal aan te passen.",
    bulletPoints: [
      "We hebben nu informatie over je gezondheidsuitdagingen",
      "De laatste vragen helpen ons bij de laatste verfijningen",
      "Daarna ontvang je je gepersonaliseerde biomarker-selectie",
    ],
    layout: "preview",
  },
  compose: {
    nextStep: 2,
    heading: "Personaliseer je bloedtest",
    subheading:
      "Geweldig! Zodra je de quiz hebt voltooid, kun je je bloedtest volledig personaliseren. Je antwoorden in de quiz helpen je bij het invullen van je Nieuw Leven Lab gezondheidsprofiel, zodat wij je resultaten beter kunnen interpreteren.",
    bulletPoints: [
      "Je kunt je test volledig personaliseren",
      "Jouw gezondheidsgegevens helpen bij de juiste interpretatie",
      "Wij geven je persoonlijk advies op basis van je profiel",
    ],
    layout: "custom",
  },
};

export default function MilestonePage() {
  const params = useParams();
  const step = params.step as keyof typeof milestoneConfig;

  // Veiligheidscheck - als de milestone niet bestaat, toon een standaard tekst
  if (!milestoneConfig[step]) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[rgb(var(--color-white-bg))]">
        <p>Ongeldige tussenstop.</p>
      </div>
    );
  }

  const config = milestoneConfig[step];

  // Props op basis van het type layout
  const milestoneProps = {
    currentStep: Number(step),
    totalQuestions: TOTAL_QUESTIONS,
    nextStep: config.nextStep,
    heading: config.heading,
    subheading: config.subheading,
    bulletPoints: config.bulletPoints,
    layout: config.layout,
  };

  // Voeg extra props toe op basis van layout type
  if (config.layout === "card") {
    return (
      <QuestionnaireMilestone
        {...milestoneProps}
        cardText={config.cardText}
        cardImage={config.cardImage}
      />
    );
  } else {
    return <QuestionnaireMilestone {...milestoneProps} />;
  }
}
