// Dit bestand is de template voor een individuele blogpostpagina.
// Het genereert metadata, haalt de specifieke postdata op basis van de [slug] parameter,
// en geeft de post weer met behulp van het BlogPost component.
import React from "react";
import { Metadata } from "next";
import {
  getAllPostSlugs,
  getPostDataAndContent,
  FullPostData,
} from "@/lib/getAllPosts";
import BlogPost from "@/components/BlogPost";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Functie om metadata dynamisch te genereren
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const postData = await getPostDataAndContent(params.slug);
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://nieuwlevellab.nl"; // Definieer je site URL
    const blogPostUrl = `${siteUrl}/blog/${params.slug}`;

    return {
      title: `${postData.seoTitle || postData.title} | Nieuw Leven Lab Blog`,
      description: postData.seoDescription || postData.excerpt,
      alternates: {
        canonical: blogPostUrl,
      },
      openGraph: {
        title: postData.title,
        description: postData.excerpt,
        url: blogPostUrl,
        type: "article",
        publishedTime: postData.date,
        authors: ["Nieuw Leven Lab"], // Aanpassen indien nodig
        images: postData.coverImage
          ? [
              {
                url: `${siteUrl}${postData.coverImage}`, // Zorg voor absolute URL
                // width: 1200, // Optioneel
                // height: 630, // Optioneel
                alt: `Cover image for ${postData.title}`,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: postData.title,
        description: postData.excerpt,
        images: postData.coverImage ? [`${siteUrl}${postData.coverImage}`] : [], // Zorg voor absolute URL
      },
    };
  } catch (error) {
    // Handle error bijv. als post niet gevonden wordt voor metadata
    return {
      title: "Post niet gevonden",
      description: "Deze blogpost kon niet worden geladen.",
    };
  }
}

// Functie om statische paden te genereren tijdens de build
export async function generateStaticParams() {
  const paths = getAllPostSlugs(); // { params: { slug: '...' } }[]
  return paths.map((path) => ({ slug: path.params.slug }));
}

// Server Component voor de blogpost pagina
async function PostPage({ params }: BlogPostPageProps) {
  try {
    const postData: FullPostData = await getPostDataAndContent(params.slug);

    // Genereer JSON-LD apart omdat dit niet direct in Metadata kan
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jouwdomein.nl";
    const blogPostUrl = `${siteUrl}/blog/${params.slug}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: postData.title,
      image: postData.coverImage ? [`${siteUrl}${postData.coverImage}`] : [],
      datePublished: postData.date,
      author: {
        "@type": "Organization",
        name: "Nieuw Leven Lab",
      },
      publisher: {
        "@type": "Organization",
        name: "Nieuw Leven Lab",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`, // Zorg dat dit pad klopt
        },
      },
      description: postData.excerpt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": blogPostUrl,
      },
    };

    return (
      <>
        {/* JSON-LD Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* BlogPost Component */}
        <BlogPost
          title={postData.title}
          date={postData.date}
          contentHtml={postData.contentHtml}
          coverImage={postData.coverImage}
        />
      </>
    );
  } catch (error) {
    // Als de post niet gevonden wordt (bijv. door ongeldige slug),
    // geef een 404 pagina weer.
    notFound();
  }
}

export default PostPage;
