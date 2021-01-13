const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'tsx', 'ts'],
  trailingSlash: true,
  images: {
    domains: ['d2va9gm4j17fy9.cloudfront.net'],
  },
});
