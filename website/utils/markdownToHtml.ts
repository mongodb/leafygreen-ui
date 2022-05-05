import { remark } from 'remark';
import html from 'remark-html';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default async function markdownToHtml(markdown: Buffer | '') {
  const result = await remark()
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(html)
    .process(markdown);
  return result.toString();
}
