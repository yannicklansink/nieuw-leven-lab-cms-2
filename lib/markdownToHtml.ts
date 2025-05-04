// Functie om markdown naar HTML te converteren (implementatie volgt)

import { remark } from 'remark';
import html from 'remark-html';

export default async function markdownToHtml(markdown: string): Promise<string> {
  // Gebruik remark en remark-html om de Markdown content (zonder front matter) te converteren
  const result = await remark().use(html).process(markdown);
  return result.toString();
} 