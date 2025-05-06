import React from "react";

interface SectionSubheadingProps {
  spanText: string;
  headingText: string;
  className?: string;
}

const SectionSubheading: React.FC<SectionSubheadingProps> = ({
  spanText,
  headingText,
  className,
}) => {
  return (
    <div className={`text-center mb-10 md:mb-16 ${className || ""}`}>
      <span
        className={`block text-sm tracking-wider uppercase text-[rgb(var(--color-normal-green))]`}
      >
        {spanText}
      </span>
      <h2 className={`mt-2 text-[rgb(var(--color-black-headings-buttons))]`}>
        {headingText}
      </h2>
    </div>
  );
};

export default SectionSubheading;
