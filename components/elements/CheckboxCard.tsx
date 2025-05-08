// Dit bestand definieert de CheckboxCard component.
// Het is een herbruikbare UI component voor het weergeven van een enkele antwoordoptie als een klikbare kaart, geschikt voor radio- en checkbox-achtige selecties.

"use client";

import React from "react";

interface CheckboxCardProps {
  id: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  type?: "radio" | "checkbox"; // type bepaalt mede de stijl of gedrag indien nodig
  disabled?: boolean;
  name?: string; // Nodig voor radio group functionaliteit
}

const CheckboxCard: React.FC<CheckboxCardProps> = ({
  id,
  label,
  value,
  checked,
  onChange,
  type = "checkbox",
  disabled = false,
  name,
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  // Basis styling, kan verder uitgebreid worden met Tailwind of CSS modules
  const baseStyle =
    "border rounded-lg p-4 cursor-pointer transition-all duration-200 ease-in-out flex items-center space-x-3";
  const checkedStyle = "bg-blue-500 border-blue-700 text-white shadow-lg";
  const uncheckedStyle = "bg-white hover:bg-gray-50 hover:border-gray-400";
  const disabledStyle = "bg-gray-100 cursor-not-allowed opacity-60";

  return (
    <div
      className={`
        ${baseStyle}
        ${checked ? checkedStyle : uncheckedStyle}
        ${disabled ? disabledStyle : ""}
      `}
      onClick={handleChange}
      role={type === "radio" ? "radio" : "checkbox"}
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleChange();
        }
      }}
    >
      {/* Visuele indicator voor checkbox/radio */}
      <div
        className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-colors duration-200 ease-in-out
          ${
            checked
              ? "bg-white border-blue-300"
              : "border-gray-300 group-hover:border-gray-400"
          }
          ${type === "radio" ? "rounded-full" : "rounded-sm"}`}
      >
        {checked && (
          <svg
            className={`w-3 h-3 ${
              type === "checkbox" ? "text-blue-500" : "text-blue-500"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {type === "checkbox" ? (
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            ) : (
              <circle cx="10" cy="10" r="5" /> // Inner circle for radio
            )}
          </svg>
        )}
      </div>
      <label htmlFor={id} className="font-medium select-none cursor-pointer">
        {label}
      </label>
      {/* Verborgen input voor accessibility en form submission indien nodig */}
      <input
        type={type}
        id={id}
        name={name} // Belangrijk voor radio groups
        value={value}
        checked={checked}
        onChange={handleChange} // React waarschuwt als checked is zonder onChange op input
        className="sr-only" // Visueel verbergen
        disabled={disabled}
        tabIndex={-1} // Verwijder van tabvolgorde, div handelt dit af
      />
    </div>
  );
};

export default CheckboxCard;
