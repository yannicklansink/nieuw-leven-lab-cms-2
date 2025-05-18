"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NavigationBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white_bg">
        {" "}
        {/* Added bg color */}
        <div className="content-container flex items-center gap-6">
          {/* Logo linked to homepage */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0 relative lg:left-[-6px]"
          >
            <Image
              src="/images/other/nieuw-leven-lab-logo-bloedtest-afleggen.png"
              alt="Nieuw Leven Lab Logo"
              width={180}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <div className="flex flex-grow justify-center space-x-6">
            {/* Sexual Health vervangen door Waarom */}
            <Link href="/hoe-het-werkt" className="menu-item">
              Hoe het werkt
            </Link>
            <a href="#" className="menu-item">
              Weight Loss
            </a>
            <a href="#" className="menu-item">
              Fertility
            </a>
            <a href="#" className="menu-item">
              Hair
            </a>
            <a href="#" className="menu-item">
              Skin
            </a>
            <a href="#" className="menu-item">
              Daily Health
            </a>
            <Link href="/product/bloedtesten" className="menu-item">
              {" "}
              {/* Link to shop page */}
              Alle Producten
            </Link>
          </div>
          {/* User Icon Link */}
          <a
            href="https://app.nieuwlevenlab.nl/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full text-black_headings_and_buttons hover:bg-extra_light_green transition duration-300 ease-in-out"
            aria-label="Login Portaal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </a>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="flex md:hidden items-center justify-between px-6 py-4 border-b border-gray-100 relative bg-white_bg">
        {/* Hamburger Button (Left) */}
        <button
          className="w-8 h-8 flex items-center justify-center"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Logo (Right) */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/other/nieuw-leven-lab-logo-bloedtest-afleggen.png"
            alt="Nieuw Leven Lab Logo"
            width={150}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white z-50 shadow-lg py-4">
            <div className="flex flex-col space-y-3 px-6">
              {/* Sexual Health vervangen door Waarom in mobiel menu */}
              <Link
                href="/hoe-het-werkt"
                className="menu-item py-2 border-b border-gray-100"
              >
                Hoe het werkt
              </Link>
              <a href="#" className="menu-item py-2 border-b border-gray-100">
                Weight Loss
              </a>
              <a href="#" className="menu-item py-2 border-b border-gray-100">
                Fertility
              </a>
              <a href="#" className="menu-item py-2 border-b border-gray-100">
                Hair
              </a>
              <a href="#" className="menu-item py-2 border-b border-gray-100">
                Skin
              </a>
              <a href="#" className="menu-item py-2 border-b border-gray-100">
                Daily Health
              </a>
              <Link href="/product/bloedtesten" className="menu-item py-2">
                {" "}
                {/* Link to shop page */}
                Alle Producten
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavigationBar;
