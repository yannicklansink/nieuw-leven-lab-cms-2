"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SectionSubheading from "@/components/elements/SpanSubheadingGreen";

export default function CancelPage() {
  const router = useRouter();

  return (
    <main className="bg-[rgb(var(--color-white-bg))] py-12 md:py-16">
      <div className="content-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <SectionSubheading
              spanText="Betaling"
              headingText="Betaling geannuleerd"
            />
            <p className="max-w-lg mx-auto mt-4">
              Je betaling is geannuleerd of niet voltooid. Geen zorgen, er is
              nog geen geld afgeschreven.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-8">
            <div className="flex justify-center mb-8">
              <div className="bg-[rgb(var(--color-extra-light-green))] p-4 rounded-full">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-[rgb(var(--color-extra-light-green))] rounded-xl p-6 mb-8">
              <h2 className="text-xl font-medium mb-4 text-[rgb(var(--color-black-headings-buttons))]">
                Wat kun je nu doen?
              </h2>
              <ul className="space-y-3">
                {[
                  "Keer terug naar de bevestigingspagina om het opnieuw te proberen",
                  "Neem contact op met onze klantenservice als je vragen hebt",
                  "Ga terug naar de homepage om later verder te gaan",
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
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link
              href="/"
              className="order-2 md:order-1 px-8 py-3 w-full md:w-auto border border-[rgb(var(--color-normal-green))] text-[rgb(var(--color-black-headings-buttons))] font-medium rounded-lg hover:bg-[rgb(var(--color-extra-light-green))] transition-colors text-center"
            >
              Terug naar homepage
            </Link>

            <button
              onClick={() => router.push("/confirm")}
              className="order-1 md:order-2 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[rgb(var(--color-dark-green))] to-[rgb(var(--color-normal-green))] text-white font-medium border-2 border-[rgb(var(--color-normal-green))] rounded-lg shadow-lg hover:shadow-[0_8px_16px_rgba(var(--color-dark-green),0.3)] hover:translate-y-[-2px] hover:scale-[1.02] transition-all group"
            >
              <span className="relative z-10 flex items-center justify-center">
                Terug naar bevestigingspagina
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
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
