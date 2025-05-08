/**
 * If we're crawling a new URL, we need to create a cluster name from it.
 */
export const createCollectionNameFromURL = (url: string): string => {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;
  // Remove the TLD (everything after the last dot) and any 'www.' prefix
  const newCollectionName = hostname
    .replace(/^www\./, '') // Remove www. prefix if present
    .replace(/\.[^.]+$/, '') // Remove the TLD (last dot and everything after)
    .replace(/\./g, '-'); // Replace any remaining dots with hyphens

  return newCollectionName;
};
