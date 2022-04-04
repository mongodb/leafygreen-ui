import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import Typography from '@leafygreen-ui/typography';
const { Body } = Typography;
import nextMdx from '@next/mdx';

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      rehypeSlug, 
      [rehypeAutolinkHeadings, { behavior: 'wrap' }], 
    ],
  }
});

const mdxConfig = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx", "tsx", "ts"],
  trailingSlash: true,
});

export default mdxConfig;