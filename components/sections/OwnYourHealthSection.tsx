import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import SectionSubheading from "../elements/SpanSubheadingGreen";

const OwnYourHealthSection: React.FC = () => {
  const images = [
    {
      src: "/images/other/vrouw-bloedtest-leukocycten-no-tekst.jpg",
      alt: "Vrouw in water met overlay van Leukocyten bloedtest resultaat",
    },
    {
      src: "/images/other/men-bloedtest-Triacylglycerolen-afbeelding-no-tekst.jpg",
      alt: "Man met zwarte jas met overlay van Triglyceriden bloedtest resultaat",
    },
    {
      src: "/images/other/vrouw-bloedtest-glucose-afbeelding-no-tekst.jpg", // Assuming this is the correct image for glucose/man in mountains
      alt: "Man in bergen met overlay van Glucose bloedtest resultaat",
    },
  ];

  // Initialize Embla Carousel
  const [emblaRef] = useEmblaCarousel({ align: "start", loop: false });

  return (
    <section
      className="py-12 md:py-16"
      style={{ backgroundColor: "rgb(var(--color-extra-light-green))" }}
    >
      <div className="content-container">
        <SectionSubheading
          spanText="revolutionaire bloedtesten"
          headingText="Bezit je eigen gezondheid"
        />
        {/* Use Embla Carousel container */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {/* Map over images within Embla container */}
            {images.map((image, index) => (
              <div
                key={index}
                // Mobile: show ~85%, Desktop: show 3 columns
                className={`embla__slide flex-[0_0_85%] md:flex-[0_0_33.33%] min-w-0 relative ${
                  index === 0
                    ? "pr-2 md:pr-3"
                    : index === images.length - 1
                    ? "pl-2 md:pl-3"
                    : "px-2 md:px-3"
                }`}
              >
                <div className="relative overflow-hidden rounded-lg shadow-md h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={900} // Aspect ratio W
                    height={1600} // Aspect ratio H
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnYourHealthSection;
