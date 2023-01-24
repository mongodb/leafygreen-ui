import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { remark } from 'remark';
import html from 'remark-html';

export default async function markdownToHtml(markdown: Buffer | '') {
  const result = await remark()
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(html)
    .process(markdown);
  return result.toString();
}
