import React from "react";
import Link from "next/link";

interface ButtonInteractiveProps {
  href: string;
  children: React.ReactNode;
}

const ButtonInteractive: React.FC<ButtonInteractiveProps> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className="inline-block px-8 py-2 rounded-lg bg-gradient-to-r from-[rgb(var(--color-dark-green))] to-[rgb(var(--color-normal-green))] text-white border-2 border-[rgb(var(--color-normal-green))] shadow-lg hover:shadow-[0_8px_16px_rgba(var(--color-dark-green),0.3)] hover:translate-y-[-2px] hover:scale-[1.02] transition-all group overflow-hidden relative"
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
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
      <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
    </Link>
  );
};

export default ButtonInteractive;
