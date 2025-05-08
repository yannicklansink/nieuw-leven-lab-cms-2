import React from "react";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";

interface CheckoutButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  className = "",
  children,
  disabled = false,
}) => {
  const { handleCheckout, isLoading, error } = useStripeCheckout({
    onError: (err) => {
      // Alleen voor ontwikkeldoeleinden - in productie gebruiken we een toastje of betere UI
      alert(`Fout bij afrekenen: ${err.message}`);
    },
  });

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={isLoading || disabled}
        aria-busy={isLoading}
        className={`relative px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg ${className}`}
      >
        {isLoading ? (
          <>
            <span className="opacity-0">
              {children || "Doorgaan naar betaling"}
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          </>
        ) : (
          children || "Doorgaan naar betaling"
        )}
      </button>
      {error && (
        <p className="text-sm text-red-600 mt-2">
          Er is een fout opgetreden: {error.message}
        </p>
      )}
    </div>
  );
};

export default CheckoutButton;
