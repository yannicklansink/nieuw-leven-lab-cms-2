import { useState, useCallback } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useQuestionnaireStore } from "./useQuestionnaireStore";

// Lazy-loaded Stripe instantie
let stripePromise: Promise<Stripe | null> | null = null;

// Functie om Stripe alleen client-side te laden
const getStripe = () => {
  if (!stripePromise && typeof window !== "undefined") {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
  }
  return stripePromise;
};

interface CheckoutOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useStripeCheckout = (options?: CheckoutOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Haal benodigde gegevens uit de store
  const selectedTests = useQuestionnaireStore((state) => state.selectedTests);
  const answers = useQuestionnaireStore((state) => state.answers);

  const handleCheckout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Validatie
      if (!selectedTests.length) {
        throw new Error("Geen tests geselecteerd");
      }

      if (!answers.email) {
        throw new Error("E-mailadres ontbreekt");
      }

      // 1. POST naar API om checkout sessie te maken
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedIds: selectedTests,
          answers: answers,
          email: answers.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Er ging iets mis bij het aanmaken van de checkout"
        );
      }

      // 2. Laad Stripe en redirect
      const stripe = await getStripe();

      if (!stripe) {
        throw new Error("Stripe kon niet worden geladen");
      }

      // Gebruik url direct als het beschikbaar is
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      // Anders redirect via redirectToCheckout
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (error) {
        throw error;
      }

      // onSuccess callback (als het niet al geredirect is)
      options?.onSuccess?.();
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      options?.onError?.(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [selectedTests, answers, options]);

  return {
    handleCheckout,
    isLoading,
    error,
  };
};
