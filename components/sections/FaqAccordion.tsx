'use client'

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "item-1",
    question: "Wat is de Nieuw Leven Lab bloedtest?",
    answer:
      "Meer dan alleen een test: een inkijk in de essentie van je welzijn. We ontgrendelen de geheimen van je gezondheid met datagedreven precisie, zodat je de regie over je toekomst kunt nemen. Dit is gezondheidsoptimalisatie in zijn puurste vorm, beginnend bij het begrijpen van je biomarkers.",
  },
  {
    id: "item-2",
    question: "Hoe vaak moet ik de bloedtest doen?",
    answer:
      "Voor optimale resultaten raden we aan om de bloedtest elke 6 maanden af te leggen. Dit stelt je in staat om veranderingen nauwkeurig te volgen en tijdig aanpassingen te maken. Indien elke 6 maanden niet haalbaar is, is jaarlijkse afname ook waardevol. Regelmatige monitoring (minimaal jaarlijks) helpt om veranderingen vroegtijdig te detecteren en proactief een gezond verouderingsproces te ondersteunen.",
  },
  {
    id: "item-3",
    question: "Wanneer en hoe ontvang ik mijn resultaten?",
    answer:
      "Na het bestellen duurt het ongeveer 2 weken voordat je de resultaten ontvangt. Ze worden per e-mail verzonden, waarna je toegang krijgt tot een beveiligde omgeving (onze app) waar je je persoonlijke biomarker gegevens kunt bekijken en analyseren.",
  },
  {
    id: "item-4",
    question: "Hoe werkt de bloedtest thuis?",
    answer:
      "Je ontvangt een testkit thuis met alles wat je nodig hebt. Je neemt de test eenvoudig zelf af met een vingerprik volgens de instructies. Vervolgens stuur je het sample gemakkelijk en veilig op naar ons laboratorium via de post.",
  },
  {
    id: "item-5",
    question: "Hoe bereid ik me voor op de bloedtest?",
    answer:
      "Plan de vingerprik 's ochtends (nuchter). Vermijd intensieve lichaamsbeweging 48 uur vooraf. Drink geen alcohol minimaal 24 uur voor de test. Neem geen supplementen binnen 24 uur voor de test. Zorg dat je minimaal 12 uur nuchter bent. Blijf voorgeschreven medicatie gebruiken. Drink voldoende water voor de test.",
  },
  {
    id: "item-6",
    question: "Wat maakt Nieuw Leven Lab anders?",
    answer:
      "Traditionele testen leidden vaak tot onduidelijke PDF's, googelen naar betekenissen, en onzekerheid over kosten. Nieuw Leven Lab stroomlijnt dit proces met een alles-in-één platform, transparante prijzen en duidelijke inzichten in jouw persoonlijke resultaten.",
  },
  {
    id: "item-7",
    question: "Wat is het Nieuw Leven Lab platform?",
    answer:
      "Een gebruiksvriendelijke app die jouw gezondheid inzichtelijk maakt. Het vertaalt je gemeten bloedwaarden (zoals cholesterol, bloedsuiker) naar begrijpelijke informatie en praktische adviezen. Duidelijke visuals en trends geven je grip op je gezondheid en tonen de impact van jouw keuzes.",
  },
  {
    id: "item-8",
    question: "Hoe betrouwbaar is de vingerpriktest thuis?",
    answer:
      "Onze technologische vooruitgang maakt een geavanceerde en uiterst betrouwbare bloedtest vanuit huis mogelijk. Het innovatieve testpakket zorgt voor een eenvoudige, pijnvrije en hygiënische afname. Het monster wordt geanalyseerd in een geaccrediteerd laboratorium met geavanceerde technieken voor nauwkeurige en diepgaande inzichten.",
  },
];

const FaqAccordion: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item) => (
        <AccordionItem value={item.id} key={item.id}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion; 