import React from "react";

interface GradientTextProps {
  leftText?: string;
  gradientText: string;
  rightText?: string;
  className?: string;
}

/**
 * Toont een tekst waarbij een deel een gradient krijgt (volgens huisstijl), de rest is zwart.
 * Voorbeeld: <GradientText leftText="Wil " gradientText="kinderen" rightText=" later?" />
 */
const GradientText: React.FC<GradientTextProps> = ({
  leftText = "",
  gradientText,
  rightText = "",
  className = "",
}) => {
  return (
    <span
      className={`inline-block text-4xl md:text-5xl md:font-light leading-tight font-normal ${className}`}
    >
      {leftText && (
        <span className="text-[rgb(var(--color-black-headings-buttons))]">
          {leftText}
        </span>
      )}
      <span
        className="bg-gradient-to-r from-[rgb(var(--color-orange))] via-[rgb(var(--color-paragraaf-secondary))] to-[rgb(var(--color-normal-green))] text-transparent bg-clip-text"
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {gradientText}
      </span>
      {rightText && (
        <span className="text-[rgb(var(--color-black-headings-buttons))]">
          {rightText}
        </span>
      )}
    </span>
  );
};

export default GradientText;
