'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  name: string;
  imageUrl: string;
  link: string;
}

const categories: Category[] = [
  { name: 'Lose weight', imageUrl: 'https://via.placeholder.com/80x60/cccccc/000000?text=Inj+Pen', link: '#' },
  { name: 'Have better sex', imageUrl: 'https://via.placeholder.com/80x60/fca5a5/000000?text=Pill', link: '#' },
  { name: 'Regrow hair', imageUrl: 'https://via.placeholder.com/80x60/9ca3af/000000?text=Spray', link: '#' },
  { name: 'Improve skin', imageUrl: 'https://via.placeholder.com/80x60/bfdbfe/000000?text=Tube', link: '#' },
  { name: 'Get fertility insights', imageUrl: 'https://via.placeholder.com/80x60/e5e7eb/000000?text=Test', link: '#' },
  { name: 'New from Ro', imageUrl: 'https://via.placeholder.com/80x60/fef08a/000000?text=Jar+Pill', link: '#' },
];

const TreatmentCategoriesSection: React.FC = () => {
  // Geschatte halve hoogte van een kaart + wat extra ruimte
  // Pas deze waarde aan om de overlap te finetunen
  const overlapPull = '16'; // Correspondeert met pb-16 en -mt-16

  return (
    <>
      {/* Sectie 1: Achtergrond, Overlay, Heading */}
      <section className={`relative pt-16 md:pt-24 pb-${overlapPull}`}> {/* Padding onderaan */}
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
          <h2 className="text-4xl">
          Preventief je gezondheid testen
          </h2>
        </div>
      </section>

      {/* Sectie 2: Card Grid (Overlappend) */}
      <section className={`relative z-20 -mt-${overlapPull} pb-16`}> {/* Negatieve marge en padding onderaan */}
        <div className="content-container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4"> {/* Geen max-w/mx-auto hier */}
            {categories.map((category) => (
              <Link href={category.link} key={category.name}>
                <div className="bg-[rgba(238,233,228,0.9)] hover:bg-[rgb(var(--color-beige-bg))] text-[rgb(var(--color-black-headings-buttons))] p-4 rounded-lg flex items-center space-x-4 transition-colors h-full shadow-md">
                  <div className="flex-shrink-0">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      width={60}
                      height={45}
                      className="rounded"
                    />
                  </div>
                  <p className="text-base md:text-lg font-medium text-left">{category.name}</p>
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