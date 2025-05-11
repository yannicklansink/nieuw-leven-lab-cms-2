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
      className="group rounded-full py-2 px-6 inline-flex items-center space-x-2 transition-all font-medium w-fit text-sm bg-gradient-to-r from-[rgb(var(--color-dark-green))] to-[rgb(var(--color-normal-green))] text-white border-2 border-[rgb(var(--color-normal-green))] shadow-lg hover:shadow-[0_8px_16px_rgba(var(--color-dark-green),0.3)] hover:translate-y-[-2px] hover:scale-[1.02] overflow-hidden relative"
    >
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
        <svg
          className="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:scale-125"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </span>
      <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
    </Link>
  );
};

export default ButtonInteractive;
