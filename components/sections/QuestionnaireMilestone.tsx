import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SectionSubheading from "@/components/elements/SpanSubheadingGreen";
import { useQuestionnaireStore } from "@/hooks/useQuestionnaireStore";
import { catalog } from "@/logic/catalog";

// Hardcoded afbeeldingen voor de carousel
const carouselImages = [
  "/images/other/vrouw-bloedtest-leukocycten-no-tekst.jpg",
  "/images/other/vrouw-bloedtest-glucose-afbeelding-no-tekst.jpg",
  "/images/other/men-bloedtest-Triacylglycerolen-afbeelding-no-tekst.jpg",
];

type MilestoneLayout = "carousel" | "card" | "preview" | "custom";

interface QuestionnaireMilestoneProps {
  currentStep: number;
  totalQuestions: number;
  nextStep: number;
  heading: string;
  subheading: string;
  bulletPoints: string[];
  layout: MilestoneLayout;
  cardImage?: string;
  cardText?: string;
}

export default function QuestionnaireMilestone({
  currentStep,
  totalQuestions,
  nextStep,
  heading,
  subheading,
  bulletPoints,
  layout,
  cardImage = "",
  cardText = "",
}: QuestionnaireMilestoneProps) {
  const router = useRouter();
  const [animateItems, setAnimateItems] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const selectedTests = useQuestionnaireStore((state) => state.selectedTests);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimateItems(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Carousel auto-rotation
    if (layout === "carousel") {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [layout]);

  const handleContinue = () => {
    router.push(`/questionnaire/${nextStep}`);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  // Top 3 aanbevolen biomarkers ophalen
  const recommendedBiomarkers = selectedTests
    .slice(0, 3)
    .map((id) => catalog.find((item) => item.id === id))
    .filter(Boolean);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const imgElement = event.currentTarget;
    imgElement.src = "/images/backgrounds/placeholder.jpg";
    imgElement.onerror = null; // Prevent infinite loop
  };

  const renderContent = () => {
    switch (layout) {
      case "carousel":
        return (
          <div className="mb-8">
            <p className=" text-center mb-6 text-[rgb(var(--color-black-headings-buttons))]">
              Sluit je aan bij een groep mensen die zelf de regie over hun
              gezondheid nemen.
            </p>

            <div className="relative max-w-md h-auto overflow-hidden rounded-lg mx-auto">
              {/* Afbeelding container met eigen aspect ratio maar kleinere afmetingen */}
              <div className="relative w-full h-auto">
                {carouselImages.map((src, index) => (
                  <div
                    key={index}
                    className="transition-opacity duration-500 ease-in-out"
                    style={{
                      display: index === currentImageIndex ? "block" : "none",
                    }}
                  >
                    <div
                      className="relative w-full"
                      style={{ height: "auto", maxHeight: "450px" }}
                    >
                      <Image
                        src={src}
                        alt={`Biomarker afbeelding ${index + 1}`}
                        width={500}
                        height={400}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "auto",
                          maxHeight: "450px",
                          margin: "0 auto",
                          borderRadius: "0.5rem",
                        }}
                        priority={index === 0}
                        onError={handleImageError}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigatie knoppen */}
              <button
                onClick={handlePreviousImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
                aria-label="Vorige afbeelding"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
                aria-label="Volgende afbeelding"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Indicator dots */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-[rgb(var(--color-normal-green))]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Ga naar afbeelding ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case "card":
        return (
          <div className="mb-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <h3 className="mb-4 text-[rgb(var(--color-black-headings-buttons))]">
                {cardText}
              </h3>

              <div className="relative w-full h-auto max-w-sm mx-auto mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/other/app/score-card-app.png"
                  alt="Score card"
                  width={200}
                  height={267}
                  style={{
                    objectFit: "contain",
                    width: "80%",
                    height: "auto",
                    borderRadius: "0.5rem",
                    margin: "0 auto",
                  }}
                  priority
                />
              </div>

              <p className="text-lg text-[rgb(var(--color-black-normal-text))]">
                Door je bloedwaarden te monitoren kun je je gezondheid
                optimaliseren.
              </p>
            </div>
          </div>
        );

      case "preview":
        return (
          <div className="mb-8">
            <div className="p-6 border border-[rgb(var(--color-black-headings-buttons))] rounded-lg mb-6">
              <h4 className="mb-4 text-[rgb(var(--color-black-headings-buttons))]">
                Op basis van je antwoorden tot nu toe raden we aan:
              </h4>

              <ul className="space-y-3 mb-4">
                {recommendedBiomarkers.length > 0 ? (
                  recommendedBiomarkers.map((biomarker, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-5 h-5 mr-3 rounded-full bg-[rgb(var(--color-normal-green))] flex-shrink-0 flex items-center justify-center text-white text-xs">
                        {index + 1}
                      </span>
                      <span>{biomarker?.name}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-center">
                      <span className="w-5 h-5 mr-3 rounded-full bg-[rgb(var(--color-normal-green))] flex-shrink-0 flex items-center justify-center text-white text-xs">
                        1
                      </span>
                      <span>ApoB (Apolipoprotein B)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-5 h-5 mr-3 rounded-full bg-[rgb(var(--color-normal-green))] flex-shrink-0 flex items-center justify-center text-white text-xs">
                        2
                      </span>
                      <span>hs-CRP (High-sensitivity C-reactive protein)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-5 h-5 mr-3 rounded-full bg-[rgb(var(--color-normal-green))] flex-shrink-0 flex items-center justify-center text-white text-xs">
                        3
                      </span>
                      <span>Insuline (nuchter)</span>
                    </li>
                  </>
                )}
              </ul>

              <p>... en nog meer gepersonaliseerde tests. Nog 4 vragen!</p>
            </div>

            {/* Testimonial card */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-3"></div>
              <p className="text-base italic">
                "De bloedtest van Nieuw Leven Lab gaf me inzicht in mijn
                gezondheidswaarden die ik nooit eerder had gezien. Nu kan ik
                gericht werken aan verbetering." - Yannick Lansink
              </p>
            </div>
          </div>
        );

      case "custom":
        return (
          <div className="mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md border border-[rgba(var(--color-normal-green),0.2)]">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3">
                  <div className="relative w-full h-auto max-w-xs mx-auto">
                    <Image
                      src="/images/other/hbA1c-biomarker-vrouw-meten.png"
                      alt="Bloedtest personaliseren"
                      width={400}
                      height={400}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "auto",
                        borderRadius: "0.5rem",
                      }}
                      onError={handleImageError}
                    />
                  </div>
                </div>

                <div className="md:w-2/3">
                  <p className="mb-4 text-[rgb(var(--color-paragraaf))]">
                    {subheading}
                  </p>

                  <ul className="space-y-3 mb-4">
                    {bulletPoints.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start transition-all duration-500"
                        style={{
                          opacity: animateItems ? 1 : 0,
                          transform: animateItems
                            ? "translateX(0)"
                            : "translateX(-20px)",
                          transitionDelay: `${index * 150 + 300}ms`,
                        }}
                      >
                        <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 bg-[rgb(var(--color-normal-green))] rounded-full text-white text-sm transition-all duration-300 hover:scale-110">
                          ✓
                        </span>
                        <span className="text-[rgb(var(--color-paragraaf))]">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div
            className="bg-[rgb(var(--color-white-bg))] rounded-lg shadow-sm p-6 md:p-8 mb-8 transition-all duration-500 ease-out"
            style={{
              opacity: animateItems ? 1 : 0,
              transform: animateItems ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <p className="text-lg mb-6 text-[rgb(var(--color-black-normal-text))]">
              {subheading}
            </p>

            <ul className="space-y-4 mb-8">
              {bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start transition-all duration-500"
                  style={{
                    opacity: animateItems ? 1 : 0,
                    transform: animateItems
                      ? "translateX(0)"
                      : "translateX(-20px)",
                    transitionDelay: `${index * 150 + 300}ms`,
                  }}
                >
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 bg-[rgb(var(--color-normal-green))] rounded-full text-white text-sm transition-all duration-300 hover:scale-110">
                    ✓
                  </span>
                  <span className="text-[rgb(var(--color-black-normal-text))]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="bg-[rgb(var(--color-white-bg))] py-6 md:py-12 min-h-screen">
      <div className="content-container">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <SectionSubheading
              spanText={
                currentStep === ("compose" as any)
                  ? "Persoonlijke bloedtest"
                  : `Stap ${currentStep} van ${totalQuestions}`
              }
              headingText={heading}
            />

            {/* Progress bar - restyled met Nieuw Leven Lab kleuren */}
            <div className="w-full bg-[rgb(var(--color-extra-light-green))] rounded-full h-2 mt-3">
              <div
                className="bg-[rgb(var(--color-normal-green))] h-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width:
                    currentStep === ("compose" as any)
                      ? "8%"
                      : `${(currentStep / totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {renderContent()}

          <div
            className="mt-8 flex justify-center transition-all duration-500"
            style={{
              opacity: animateItems ? 1 : 0,
              transform: animateItems ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "800ms",
            }}
          >
            <button
              onClick={handleContinue}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-[rgb(var(--color-dark-green))] to-[rgb(var(--color-normal-green))] text-white font-medium border-2 border-[rgb(var(--color-normal-green))] shadow-lg hover:shadow-[0_8px_16px_rgba(var(--color-dark-green),0.3)] hover:translate-y-[-2px] hover:scale-[1.02] transition-all group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center justify-center">
                Doorgaan
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
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
