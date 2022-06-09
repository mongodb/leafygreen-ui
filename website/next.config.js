import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import nextMdx from '@next/mdx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
});

const mdxConfig = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'tsx', 'ts'],
  trailingSlash: true,
  webpack: (config, options) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'prop-types$': path.join(__dirname, '../node_modules/axe-prop-types'),
      },
    };
    return config;
  },
});

export default mdxConfig;
