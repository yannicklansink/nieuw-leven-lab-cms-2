"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuestionnaireStore } from "@/hooks/useQuestionnaireStore";
import SectionSubheading from "@/components/elements/SpanSubheadingGreen";

interface SessionDetails {
  isSuccessful: boolean;
  status: string;
  customerEmail?: string;
  metadata?: {
    tests?: string;
    email?: string;
    gender?: string;
    date?: string;
  };
}

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sid");
  const [isLoading, setIsLoading] = useState(true);
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(
    null
  );
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  // Reset de vragenlijst antwoorden, maar niet onmiddellijk
  // zodat we nog steeds toegang hebben tot gegevens die we nodig hebben
  const resetAnswers = useQuestionnaireStore((state) => state.resetAnswers);
  const answers = useQuestionnaireStore((state) => state.answers);
  const selectedTests = useQuestionnaireStore((state) => state.selectedTests);

  useEffect(() => {
    if (!sessionId) {
      // Als er geen session ID is, stuur de gebruiker terug naar de homepage
      router.push("/");
      return;
    }

    // Haal sessiedetails op van de verify API
    const verifySession = async () => {
      try {
        const response = await fetch(`/api/verify-session?sid=${sessionId}`);

        if (!response.ok) {
          throw new Error("Kon de sessie niet verifiëren");
        }

        const data = await response.json();
        setSessionDetails(data);

        // Als de sessie niet succesvol is, toon een foutmelding
        if (!data.isSuccessful) {
          setVerificationError(
            "De betaling is nog niet voltooid. Als je de betaling hebt gedaan, kan het even duren voordat dit wordt verwerkt."
          );
        }
      } catch (error) {
        console.error("Fout bij verifiëren van sessie:", error);
        setVerificationError(
          "Er was een probleem bij het verifiëren van je betaling."
        );
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();

    // Reset de antwoorden wanneer de component unmount
    return () => {
      resetAnswers();
    };
  }, [sessionId, router, resetAnswers]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[rgb(var(--color-white-bg))]">
        <p className="text-[rgb(var(--color-paragraaf))]">
          Betalingsgegevens laden...
        </p>
      </div>
    );
  }

  // Bepaal welke e-mail we moeten tonen (van sessie of lokaal)
  const emailToShow =
    sessionDetails?.customerEmail ||
    sessionDetails?.metadata?.email ||
    answers.email ||
    "je e-mailadres";

  // Bepaal welke tests we moeten tonen (van sessie of lokaal)
  const testsToShow =
    sessionDetails?.metadata?.tests?.split(",") || selectedTests;

  return (
    <main className="bg-[rgb(var(--color-white-bg))] py-12 md:py-16">
      <div className="content-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <SectionSubheading
              spanText="Bestelling"
              headingText={
                verificationError
                  ? "Betalingsstatus in behandeling"
                  : "Betaling succesvol!"
              }
            />
            <p className="max-w-lg mx-auto mt-4">
              {verificationError
                ? "Je betaling moet nog worden verwerkt. Controleer je e-mail voor updates."
                : `Bedankt voor je bestelling. We hebben een bevestiging gestuurd naar ${emailToShow}.`}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-8">
            <div className="flex justify-center mb-8">
              <div
                className={`${
                  verificationError
                    ? "bg-[rgb(var(--color-beige-bg))]"
                    : "bg-[rgb(var(--color-extra-light-green))]"
                } p-4 rounded-full`}
              >
                {verificationError ? (
                  <svg
                    className="h-12 w-12 text-[rgb(var(--color-orange))]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-12 w-12 text-[rgb(var(--color-normal-green))]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>

            {verificationError && (
              <div className="mb-6 p-4 bg-[rgb(var(--color-beige-bg))] border border-[rgb(var(--color-orange))] rounded-lg text-[rgb(var(--color-paragraaf))]">
                <p>{verificationError}</p>
              </div>
            )}

            <div className="bg-[rgb(var(--color-extra-light-green))] rounded-xl p-6 mb-8">
              <h2 className="text-xl font-medium mb-4 text-[rgb(var(--color-black-headings-buttons))]">
                Wat gebeurt er nu?
              </h2>
              <ol className="space-y-3">
                {[
                  "We sturen je binnen 1-2 werkdagen een testkit om bloed af te nemen.",
                  "Met de bijgevoegde instructies neem je thuis eenvoudig een bloedmonster af.",
                  "Stuur het monster terug met de voorgefrankeerde envelop.",
                  "Zodra we je monster hebben geanalyseerd krijg je toegang tot onze app. Je krijgt inloggegevens per mail.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 bg-[rgb(var(--color-normal-green))] rounded-full text-white text-sm">
                      {index + 1}
                    </span>
                    <span className="text-[rgb(var(--color-paragraaf))]">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {testsToShow && testsToShow.length > 0 && (
              <div className="p-6 border border-[rgb(var(--color-normal-green))] rounded-xl">
                <h2 className="text-xl font-medium mb-4 text-[rgb(var(--color-black-headings-buttons))]">
                  Je geselecteerde biomarkers
                </h2>
                <p className="text-sm text-[rgb(var(--color-paragraaf))] mb-4">
                  Je testpakket bevat de volgende biomarkers:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {testsToShow.map((test) => (
                    <span
                      key={test}
                      className="px-3 py-1 bg-[rgb(var(--color-extra-light-green))] text-[rgb(var(--color-normal-green))] rounded-full text-sm"
                    >
                      {test}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link
              href="/faq"
              className="order-2 md:order-1 px-8 py-3 w-full md:w-auto border border-[rgb(var(--color-normal-green))] text-[rgb(var(--color-black-headings-buttons))] font-medium rounded-lg hover:bg-[rgb(var(--color-extra-light-green))] transition-colors text-center"
            >
              Veelgestelde vragen
            </Link>

            <Link
              href="/"
              className="order-1 md:order-2 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[rgb(var(--color-dark-green))] to-[rgb(var(--color-normal-green))] text-white font-medium border-2 border-[rgb(var(--color-normal-green))] rounded-lg shadow-lg hover:shadow-[0_8px_16px_rgba(var(--color-dark-green),0.3)] hover:translate-y-[-2px] hover:scale-[1.02] transition-all group"
            >
              <span className="relative z-10 flex items-center justify-center">
                Terug naar homepage
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
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
