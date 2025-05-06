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
import TabsDemo from "@/components/sections/TabsShowcase";
import HeroProductSection from "@/components/sections/HeroProductSection";

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
        <HeroProductSection />
      </div>

      {/* Desktop VideoSection - alleen zichtbaar op md en groter */}
      <div className="hidden md:block relative">
        <VideoSection videoUrl="https://player.vimeo.com/video/1080491793?h=8b50bc4fd9&autoplay=1&loop=1&background=1&muted=1" />
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="content-container z-10">
            <div className="max-w-md pointer-events-auto">
              <h2 className="text-white mb-6">
              Persoonlijke bloedtesten voor een betere gezondheid.
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
              Persoonlijke bloedtesten voor een betere gezondheid.
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
      <section className="content-container my-12 md:my-20">
        <TreatmentCategoriesSection />
      </section>
      <section className="content-container pb-24">
        <TabsDemo />
      </section>
      <AuroraBackgroundDemo />
      <section className="content-container my-12 md:my-16">
        <h2 className="text-center mb-10">Veelgestelde vragen</h2>
        <div className="w-full max-w-3xl mx-auto">
          <FaqAccordion />
        </div>
      </section>
    </main>
  );
}
