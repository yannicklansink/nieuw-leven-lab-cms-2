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
    "border rounded-lg px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out flex items-center space-x-2";
  const checkedStyle =
    "bg-[rgb(var(--color-normal-green))] border-[rgb(var(--color-dark-green))] text-white shadow-sm";
  const uncheckedStyle =
    "bg-white hover:bg-[rgb(var(--color-extra-light-green))] hover:border-[rgb(var(--color-normal-green))]";
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
        className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-colors duration-200 ease-in-out
          ${
            checked
              ? "bg-white border-[rgb(var(--color-normal-green))]"
              : "border-gray-300 group-hover:border-gray-400"
          }
          ${type === "radio" ? "rounded-full" : "rounded-sm"}`}
      >
        {checked && (
          <svg
            className={`w-2.5 h-2.5 ${
              type === "checkbox"
                ? "text-[rgb(var(--color-dark-green))]"
                : "text-[rgb(var(--color-dark-green))]"
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
      <label
        htmlFor={id}
        className="text-sm font-medium select-none cursor-pointer"
      >
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
