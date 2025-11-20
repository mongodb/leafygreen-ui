/**
 * Application configuration
 */

export const config = {
  /**
   * Base URL of the application
   * Defaults to localhost:3000 in development
   */
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',

  /**
   * Allowed origins for iframe embedding
   */
  allowedIframeOrigins: process.env.ALLOWED_IFRAME_ORIGINS?.split(',') || [],
} as const;

export default config;
