import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

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
        {children}
      </body>
    </html>
  );
}
