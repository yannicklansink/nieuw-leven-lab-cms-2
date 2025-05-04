import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownToHtml from './markdownToHtml'; // Importeer de conversie functie

// Definiëer het pad naar de content map
const postsDirectory = path.join(process.cwd(), 'content/blog');

// Interface voor de metadata uit front matter
export interface PostFrontMatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  [key: string]: any; // Voor eventuele extra velden
}

// Interface voor de volledige post data (metadata + slug)
export interface PostData extends PostFrontMatter {
  slug: string;
}

// Interface voor post data inclusief HTML content
export interface FullPostData extends PostData {
    contentHtml: string;
}

// Functie om de slugs van alle posts op te halen (voor getStaticPaths)
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''), // Verwijder .md extensie
      },
    };
  });
}

// Functie om basis data van alle posts op te halen en te sorteren
export function getAllPostsSorted(): PostData[] {
  // Haal bestandsnamen op uit /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Verwijder ".md" van bestandsnaam om slug te krijgen
    const slug = fileName.replace(/\.md$/, '');

    // Lees markdown bestand als string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Gebruik gray-matter om post metadata sectie te parsen
    const matterResult = matter(fileContents);

    // Combineer de data met de slug
    return {
      slug,
      ...(matterResult.data as PostFrontMatter), // Cast naar onze interface
    };
  });

  // Sorteer posts op datum (nieuwste eerst)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}


// Functie om data én content van een specifieke post op te halen
export async function getPostDataAndContent(slug: string): Promise<FullPostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Gebruik gray-matter om post metadata sectie te parsen
  const matterResult = matter(fileContents);

  // Gebruik remark om markdown naar HTML string te converteren
  const contentHtml = await markdownToHtml(matterResult.content);

  // Combineer de data met de slug en HTML content
  return {
    slug,
    contentHtml,
    ...(matterResult.data as PostFrontMatter),
  };
}

// Voeg eventueel meer functies toe voor metadata, content, etc. 