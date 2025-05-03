"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import VideoSection from "@/components/sections/VideoSection";
import Button from "@/components/elements/Button";
import ProductListingSection from "@/components/sections/ProductListingSection";
import OwnYourHealthSection from "@/components/sections/OwnYourHealthSection";
import TreatmentCategoriesSection from "@/components/sections/TreatmentCategoriesSection";
import FaqAccordion from "@/components/sections/FaqAccordion";
import AuroraBackgroundDemo from "@/components/sections/BackgroundGradient";

// Simplified Product interface for the homepage
interface HomePageProduct {
  slug: string;
  title: string;
  imageUrl: string;
  omschrijving_kort: string;
  price?: number;
}

export default function Home() {
  const [products, setProducts] = useState<HomePageProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Received invalid data format from API");
          setError("Kon productgegevens niet laden (ongeldig formaat).");
          setProducts([]);
        }
      } catch (e) {
        console.error("Error fetching products:", e);
        setError("Kon productgegevens niet laden.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="content-container mx-auto px-4 md:px-6">
      {/* Desktop Hero Section */}
        <section className="hidden md:flex py-12">
        <div className="w-1/2">
            <h1>
              100% online,
              <br />
            we got you
          </h1>
        </div>
        <div className="w-1/2">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
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
                  className="w-5 h-5"
                >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
                <span className="text-sm">2,000,000+ members treated</span>
            </div>
            <div className="flex items-center space-x-2">
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
                  className="w-5 h-5"
                >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="8" x2="16" y2="8"></line>
                <line x1="16" y1="12" x2="16" y2="12"></line>
                <line x1="16" y1="16" x2="16" y2="16"></line>
                <line x1="8" y1="8" x2="8" y2="8"></line>
                <line x1="8" y1="12" x2="8" y2="12"></line>
                <line x1="8" y1="16" x2="8" y2="16"></line>
              </svg>
                <span className="text-sm">Free and discreet shipping</span>
            </div>
            <div className="flex items-center space-x-2">
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
                  className="w-5 h-5"
                >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
                <span className="text-sm">100% online process</span>
            </div>
            <div className="flex items-center space-x-2">
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
                  className="w-5 h-5"
                >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
                <span className="text-sm">No insurance required</span>
            </div>
          </div>
        </div>
      </section>
      {/* Mobile Hero Section */}
        <section className="md:hidden py-6">
        <div className="flex items-center space-x-2 mb-2">
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
              className="w-5 h-5"
            >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
            <span className="text-sm">2,000,000+ members treated</span>
        </div>
        <div className="flex items-center space-x-2 mb-6">
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
              className="w-5 h-5"
            >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="8" x2="16" y2="8"></line>
            <line x1="16" y1="12" x2="16" y2="12"></line>
            <line x1="16" y1="16" x2="16" y2="16"></line>
            <line x1="8" y1="8" x2="8" y2="8"></line>
            <line x1="8" y1="12" x2="8" y2="12"></line>
            <line x1="8" y1="16" x2="8" y2="16"></line>
          </svg>
            <span className="text-sm">Free and discreet shipping</span>
        </div>
          <h1>
            Fuller hair,
            <br />
          we got you
        </h1>
      </section>
        {/* --- Start: Samengevoegde Product Cards Sectie --- */}
        <section className="pb-6">
          {/* Enkele grid container voor alle 5 kaarten */}
          {/* Mobiel: 1 kolom. Desktop (md+): 6 kolommen voor layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* --- Bovenste Rij --- */}
            {/* Weight Loss Card (Neemt 3 van 6 kolommen op desktop) */}
            <div className="bg-[#f7f5f2] rounded-lg overflow-hidden flex md:col-span-3">
              <div className="p-6 flex flex-col h-full w-full">
                <div className="flex-grow">
                  <h3 className="mb-6">
                    Lose weight
                    <br />
                with GLP-1s
                  </h3>
              <div className="h-64 relative">
                    <Image
                  src="https://images.pexels.com/photos/8460220/pexels-photo-8460220.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                  alt="GLP-1 medication" 
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                />
                  </div>
              </div>
              <div className="flex justify-end mt-4">
                  <Button variant="primary">Get started</Button>
              </div>
            </div>
          </div>
          
            {/* Sparks Card (Neemt 3 van 6 kolommen op desktop) */}
            <div className="bg-[#f7f5f2] rounded-lg overflow-hidden flex md:col-span-3">
              <div className="p-6 flex flex-col h-full w-full">
                <div className="flex-grow">
                  <h3 className="mb-4">
                    Get hard faster
                    <br />
                with Sparks
                  </h3>
              <div className="inline-block bg-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                Best seller
              </div>
              <div className="h-64 relative">
                    <Image
                  src="https://images.pexels.com/photos/7661589/pexels-photo-7661589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                  alt="Sparks pill" 
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="primary">Get started</Button>
                </div>
              </div>
            </div>

            {/* --- Onderste Rij --- */}
            {/* Zepbound Card (Neemt 2 van 6 kolommen op desktop) */}
            <div className="bg-[#D8CADF] rounded-lg overflow-hidden p-6 flex items-center justify-between md:col-span-2">
              <div className="flex items-center">
                <div className="w-12 h-12 mr-4">
                  <Image
                    src="https://via.placeholder.com/100"
                    alt="Zepbound vial"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-base font-medium">
                    Access
                    <br />
                    Zepbound® in a vial
                  </p>
                </div>
              </div>
              <button className="bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-gray-800 transition-all">
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
                  className="w-4 h-4"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* Daily Rise Card (Neemt 2 van 6 kolommen op desktop) */}
            <div className="bg-[#E9E9E9] rounded-lg overflow-hidden p-6 flex items-center justify-between md:col-span-2">
              <div className="flex items-center">
                <div className="w-12 h-12 mr-4">
                  <Image
                    src="https://via.placeholder.com/100"
                    alt="Daily Rise product"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-base font-medium">
                    Have better sex
                    <br />
                    with Daily Rise
                  </p>
                </div>
              </div>
              <button className="bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-gray-800 transition-all">
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
                  className="w-4 h-4"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

            {/* Hair Regrowth Card (Neemt 2 van 6 kolommen op desktop) */}
            <div className="bg-[#C9D4E2] rounded-lg overflow-hidden p-6 flex items-center justify-between md:col-span-2">
              <div className="flex items-center">
                <div className="w-12 h-12 mr-4">
                  <Image
                    src="https://via.placeholder.com/100"
                    alt="Hair regrowth product"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-base font-medium">Regrow your hair</p>
                </div>
              </div>
              <button className="bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-gray-800 transition-all">
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
                  className="w-4 h-4"
                >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
          </div>
        </section>
        {/* --- Einde: Samengevoegde Product Cards Sectie --- */}
      </div>{" "}
      {/* Desktop VideoSection - alleen zichtbaar op md en groter */}
      <div className="hidden md:block relative">
        <VideoSection videoUrl="https://player.vimeo.com/video/1080491793?h=8b50bc4fd9&autoplay=1&loop=1&background=1&muted=1" />
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="content-container z-10">
            <div className="max-w-md pointer-events-auto">
              <h2 className="text-white mb-6">
                Lose weight and keep it off with GLP-1s
              </h2>
              <Button href="https://google.com" variant="secondary">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobiele VideoSection - alleen zichtbaar op kleinere schermen dan md */}
      <div className="md:hidden relative">
        <VideoSection videoUrl="https://player.vimeo.com/video/1080497953?h=d6f2698e5f&autoplay=1&loop=1&background=1&muted=1" />
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="content-container z-10">
            <div className="max-w-md pointer-events-auto">
              <h2 className="text-white mb-6">
                Lose weight and keep it off with GLP-1s
              </h2>
              <Button href="https://google.com" variant="secondary">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="content-container">
        <ProductListingSection
          loading={loading}
          error={error}
          products={products}
        />
      </div>
      <OwnYourHealthSection />
      <TreatmentCategoriesSection />

      <section className="content-container py-12 md:py-16">
        <h2 className="text-center mb-10">Veelgestelde vragen</h2>
        <div className="w-full max-w-3xl mx-auto">
          <FaqAccordion />
        </div>
      </section>
      <AuroraBackgroundDemo/>
    </main>
  );
}
