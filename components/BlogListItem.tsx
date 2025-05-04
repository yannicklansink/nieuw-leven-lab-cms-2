import React from 'react';
import Link from 'next/link';

interface BlogListItemProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const BlogListItem: React.FC<BlogListItemProps> = ({ slug, title, date, excerpt }) => {
  return (
    <article className="mb-8 border-b pb-4">
      <Link href={`/blog/${slug}`} className="block mb-2">
        <h3 className="text-2xl font-semibold hover:text-[rgb(var(--color-normal-green))] transition-colors duration-200">{title}</h3>
      </Link>
      <p className="text-sm text-[rgb(var(--color-paragraaf-secondary))] mb-3">Gepubliceerd op: {date}</p>
      <p className="text-[rgb(var(--color-paragraaf))] text-base leading-relaxed">{excerpt}</p>
      <Link href={`/blog/${slug}`} className="inline-block mt-3 text-sm font-medium text-[rgb(var(--color-normal-green))] hover:text-[rgb(var(--color-dark-green))] transition-colors duration-200">
        Lees verder &rarr;
      </Link>
    </article>
  );
};

export default BlogListItem; 