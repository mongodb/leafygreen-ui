import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import nextMdx from '@next/mdx';

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
  }
});

const mdxConfig = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx", "tsx", "ts"],
  trailingSlash: true,
});

export default mdxConfig;