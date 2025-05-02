import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  const footerLinks = {
    producten: [
      { name: "Alle Bloedtesten", href: "/product/bloedtesten" },
      {
        name: "Energie & Kracht",
        href: "/product/bloedtesten/energie-spierkracht-mannen",
      }, // Example link
      {
        name: "Hormoonbalans",
        href: "/product/bloedtesten/hormoonbalans-vrouwen",
      }, // Example link
      {
        name: "Anti-Aging",
        href: "/product/bloedtesten/anti-aging-biohacking",
      }, // Example link
      // Add more relevant product links or categories
    ],
    overOns: [
      { name: "Over Nieuw Leven Lab", href: "/over-ons" }, // Placeholder links
      { name: "Wetenschap", href: "/wetenschap" },
      { name: "Blog", href: "/blog" },
      { name: "Werken bij", href: "/carriere" },
    ],
    support: [
      { name: "Contact", href: "/contact" },
      { name: "Veelgestelde Vragen", href: "/faq" },
      { name: "Verzending & Retourneren", href: "/verzending-retourneren" },
    ],
    legal: [
      { name: "Algemene Voorwaarden", href: "/algemene-voorwaarden" },
      { name: "Privacybeleid", href: "/privacybeleid" },
      { name: "Cookiebeleid", href: "/cookiebeleid" },
    ],
  };

  return (
    <footer
      className="pt-16 pb-8"
      style={{
        backgroundColor: "rgb(var(--color-black-headings-buttons))",
      }}
    >
      <div className="content-container">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Producten */}
          <div>
            <h5
              className="font-semibold mb-4 text-sm"
              style={{ color: "rgb(var(--color-white-bg))" }}
            >
              Producten
            </h5>
            <ul className="space-y-3">
              {footerLinks.producten.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-gray-300"
                    style={{ color: "rgb(var(--color-white-bg))" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Over Ons */}
          <div>
            <h5
              className="font-semibold mb-4 text-sm"
              style={{ color: "rgb(var(--color-white-bg))" }}
            >
              Over Ons
            </h5>
            <ul className="space-y-3">
              {footerLinks.overOns.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-gray-300"
                    style={{ color: "rgb(var(--color-white-bg))" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h5
              className="font-semibold mb-4 text-sm"
              style={{ color: "rgb(var(--color-white-bg))" }}
            >
              Support
            </h5>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-gray-300"
                    style={{ color: "rgb(var(--color-white-bg))" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h5
              className="font-semibold mb-4 text-sm"
              style={{ color: "rgb(var(--color-white-bg))" }}
            >
              Legal
            </h5>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-gray-300"
                    style={{ color: "rgb(var(--color-white-bg))" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Logo and Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/other/logo-text-wit.png"
              alt="Nieuw Leven Lab Logo"
              width={120}
              height={21}
              className="h-5 w-auto"
            />
          </Link>
          <p
            className="text-xs text-center md:text-right"
            style={{ color: "rgb(156 163 175)" }}
          >
            © {new Date().getFullYear()} Nieuw Leven Lab. Alle rechten
            voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
