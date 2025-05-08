"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-3 rounded-full">
            <svg
              className="h-12 w-12 text-orange-600"
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
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Betaling geannuleerd
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Je betaling is geannuleerd of niet voltooid. Geen zorgen, er is nog
          geen geld afgeschreven.
        </p>

        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Wat kun je nu doen?
          </h2>
          <ul className="text-left list-disc pl-5 space-y-2 text-gray-600">
            <li>
              Keer terug naar de bevestigingspagina om het opnieuw te proberen
            </li>
            <li>Neem contact op met onze klantenservice als je vragen hebt</li>
            <li>Ga terug naar de homepage om later verder te gaan</li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => router.push("/confirm")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Terug naar bevestigingspagina
          </button>

          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Terug naar homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
