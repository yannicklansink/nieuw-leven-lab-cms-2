"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpenIcon,
  BeakerIcon,
  QuestionMarkCircleIcon,
  ShoppingCartIcon,
  BoltIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline"; // Importeer specifieke iconen

interface Category {
  name: string;
  // imageUrl: string; // Verwijderd
  iconComponent: React.ElementType; // Gebruik een algemener type
  link: string;
}

// --- Bijgewerkte Categorieën Array met Heroicons ---
const categories: Category[] = [
  {
    name: "Lees manifesto",
    iconComponent: BookOpenIcon, // Gebruik geïmporteerd icoon
    link: "#", // Link naar manifesto pagina?
  },
  {
    name: "Vitamine bloedtest",
    iconComponent: BeakerIcon, // Gebruik geïmporteerd icoon
    link: "/product/bloedtesten/vitamine-mineralen-compleet",
  },
  {
    name: "Hoe het werkt",
    iconComponent: QuestionMarkCircleIcon, // Gebruik geïmporteerd icoon
    link: "#", // Link naar uitleg pagina?
  },
  {
    name: "Shop",
    iconComponent: ShoppingCartIcon, // Gebruik geïmporteerd icoon
    link: "/product/bloedtesten",
  },
  {
    name: "Spierkracht bloedtest",
    iconComponent: BoltIcon, // Gebruik geïmporteerd icoon
    link: "/product/bloedtesten/spierkracht-profiel-bloedtest",
  },
  {
    name: "Hormoon bloedtest",
    iconComponent: ScaleIcon, // Gebruik geïmporteerd icoon
    link: "/product/bloedtesten/hormoonbalans-vrouwen",
  },
];

const TreatmentCategoriesSection: React.FC = () => {
  // Geschatte halve hoogte van een kaart + wat extra ruimte
  // Pas deze waarde aan om de overlap te finetunen
  const overlapPull = "16"; // Correspondeert met pb-16 en -mt-16

  return (
    <>
      {/* Sectie 1: Achtergrond, Overlay, Heading */}
      <section className={`relative pt-16 md:pt-24 pb-${overlapPull}`}>
        {" "}
        {/* Padding onderaan */}
        {/* Background Image */}
        <Image
          src="https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Replace with your actual image URL
          alt="Couple relaxing in bed"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-1"></div>
        {/* Heading Content */}
        <div className="relative z-10 content-container text-center text-white">
          <h2 className="text-4xl">Preventief je gezondheid testen</h2>
        </div>
      </section>

      {/* Sectie 2: Card Grid (Overlappend) */}
      <section className={`relative z-20 -mt-${overlapPull} pb-16`}>
        {" "}
        {/* Negatieve marge en padding onderaan */}
        <div className="content-container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {" "}
            {/* Geen max-w/mx-auto hier */}
            {categories.map((category) => (
              <Link href={category.link} key={category.name}>
                <div className="bg-[rgba(238,233,228,0.9)] hover:bg-[rgb(var(--color-beige-bg))] text-[rgb(var(--color-black-headings-buttons))] p-4 rounded-lg flex items-center space-x-4 transition-colors h-full shadow-md">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                    {" "}
                    {/* Aangepaste container voor icoon */}
                    {/* Render het icoon component */}
                    <category.iconComponent
                      className="w-6 h-6 text-[rgb(var(--color-normal-green))]"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-sm md:text-lg font-light text-left">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TreatmentCategoriesSection;
