/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@lg-mcp-ui/list-databases',
    '@leafygreen-ui/card',
    '@leafygreen-ui/typography',
    '@leafygreen-ui/emotion',
    '@leafygreen-ui/tokens',
    '@leafygreen-ui/lib',
  ],

  async headers() {
    // Get allowed origins from environment variable
    const allowedOrigins = process.env.ALLOWED_IFRAME_ORIGINS?.split(',') || [
      '*',
    ];

    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          // CORS headers for iframe embedding
          {
            key: 'Access-Control-Allow-Origin',
            value: allowedOrigins[0] || '*', // Use first origin or wildcard
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          // Content Security Policy for iframe embedding
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self'",
              `frame-ancestors ${allowedOrigins.join(' ')}`, // Allows embedding in iframes from these origins
            ].join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
