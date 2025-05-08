// Dit is de hoofdlayout van de applicatie.
// Het omvat de basis HTML-structuur en de HydrationGuard voor server-side rendering.
import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import NavigationBar from "@/components/sections/NavMenu";
import Footer from "@/components/sections/Footer";
import React from "react";
import HydrationGuard from "@/hooks/useHydrated";

export const metadata: Metadata = {
  title: "Nieuw Leven Lab | Bloedtesten vanuit huis",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className="overflow-x-hidden">
      <body className={`${GeistSans.className} overflow-x-hidden`}>
        <NavigationBar />
        <HydrationGuard>
          <main>{children}</main>
        </HydrationGuard>
        <Footer />
      </body>
    </html>
  );
}
