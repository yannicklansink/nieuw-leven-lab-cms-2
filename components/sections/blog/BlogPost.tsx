// Dit component definieert de weergave van de volledige inhoud van een blogpost.
// Het toont de titel, datum, coverafbeelding en de geconverteerde HTML-inhoud.
import React from "react";
import Image from "next/image";

interface BlogPostProps {
  title: string;
  date: string;
  contentHtml: string;
  coverImage: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  date,
  contentHtml,
  coverImage,
}) => {
  return (
    // Gebruik prose klassen van Tailwind Typography voor basis styling van de HTML content
    <div className="content-container">
      <article className="prose lg:prose-lg xl:prose-xl max-w-none mx-auto py-8 md:py-12">
        {/* Cover image (relative position nodig voor fill) */}
        {coverImage && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={coverImage}
              alt={`Cover image for ${title}`}
              layout="fill"
              objectFit="cover"
              priority // Prioriteit voor LCP
            />
          </div>
        )}
        {/* Titel (override prose h1 styles indien nodig) */}
        <h1 className="!mb-2">{title}</h1>
        {/* Datum */}
        <p className="text-gray-600 text-base !mt-0 !mb-8">
          Gepubliceerd op: {date}
        </p>
        {/* HTML Content */}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </div>
  );
};

export default BlogPost;
