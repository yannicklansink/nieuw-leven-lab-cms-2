import React from 'react';
import { Metadata } from 'next';
import { getAllPostsSorted, PostData } from '@/lib/getAllPosts'; // Gebruik @/ alias
import BlogListItem from '@/components/BlogListItem'; // Gebruik @/ alias

// Metadata voor de blog index pagina
export const metadata: Metadata = {
  title: 'Nieuw Leven Lab Blog',
  description: 'Ontdek inzichten en tips over gezondheid, biohacking en meer.',
  // Voeg hier eventueel openGraph en andere metadata toe indien gewenst
};

// Server Component: haalt data direct op
async function BlogPage() {
  const allPostsData: PostData[] = getAllPostsSorted(); // Haal data direct op

  return (
    // Geen <Layout> of <PageLayout> nodig, app/layout.tsx wordt gebruikt
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-center text-4xl font-bold mb-12">Ons Blog</h1>
      {allPostsData.length > 0 ? (
        <div className="max-w-3xl mx-auto space-y-8">
          {allPostsData.map(({ slug, title, date, excerpt }) => (
            <BlogListItem
              key={slug}
              slug={slug}
              title={title}
              date={date}
              excerpt={excerpt}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">Er zijn nog geen blogposts gepubliceerd.</p>
      )}
    </div>
  );
}

export default BlogPage; 