'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Assuming cn utility exists

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'custom'; // Added variant prop
  customClassName?: string; // Added for custom styling
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  href, 
  variant = 'custom', // Default to custom to use provided className
  className, // Use existing className for the custom case
  customClassName, // Allow overriding or extending className
  ...props 
}) => {
  const baseClasses = "group rounded-full py-3 px-6 inline-flex items-center space-x-2 transition-all font-medium w-fit";
  
  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses = 'btn-primary'; // Use class from globals.css
  } else if (variant === 'secondary') {
    variantClasses = 'btn-secondary'; // Use class from globals.css
  } else if (variant === 'custom') {
    variantClasses = className || ''; // Use provided className if variant is custom
  }

  const combinedClassName = cn(baseClasses, variantClasses, customClassName);

  const content = (
    <>
      <span>{children}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:scale-125">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...props as any}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {content}
    </button>
  );
};

export default Button; 