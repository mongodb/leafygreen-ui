// Add keys to meta tags in order to help Next.js prioritize when duplicates appear on a page
// https://nextjs.org/docs/api-reference/next/head
const metaTagKey = {
  Title: 'title',
  Description: 'description',
} as const;

export default metaTagKey;
