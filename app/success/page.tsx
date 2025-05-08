"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuestionnaireStore } from "@/hooks/useQuestionnaireStore";

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
      <div className="flex justify-center items-center min-h-screen">
        <p>Betalingsgegevens laden...</p>
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
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div
            className={`${
              verificationError ? "bg-yellow-100" : "bg-green-100"
            } p-3 rounded-full`}
          >
            {verificationError ? (
              <svg
                className="h-12 w-12 text-yellow-600"
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
                className="h-12 w-12 text-green-600"
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

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {verificationError
            ? "Betalingsstatus in behandeling"
            : "Betaling succesvol!"}
        </h1>

        {verificationError && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
            <p>{verificationError}</p>
          </div>
        )}

        <p className="text-lg text-gray-600 mb-6">
          {verificationError
            ? "Je betaling moet nog worden verwerkt. Controleer je e-mail voor updates."
            : `Bedankt voor je bestelling. We hebben een bevestiging gestuurd naar ${emailToShow}.`}
        </p>

        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Wat gebeurt er nu?
          </h2>
          <ol className="text-left list-decimal pl-5 space-y-2 text-gray-600">
            <li>
              We sturen je binnen 1-2 werkdagen een testkit om bloed af te
              nemen.
            </li>
            <li>
              Met de bijgevoegde instructies neem je thuis eenvoudig een
              bloedmonster af.
            </li>
            <li>Stuur het monster terug met de voorgefrankeerde envelop.</li>
            <li>
              Zodra we je monster hebben geanalyseerd krijg je toegang tot onze
              app. Je krijgt inloggegevens per mail.
            </li>
          </ol>
        </div>

        {testsToShow && testsToShow.length > 0 && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Je geselecteerde biomarkers
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Je testpakket bevat de volgende biomarkers:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {testsToShow.map((test) => (
                <span
                  key={test}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {test}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Terug naar homepage
          </Link>

          <Link
            href="/faq"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Veelgestelde vragen
          </Link>
        </div>
      </div>
    </div>
  );
}
