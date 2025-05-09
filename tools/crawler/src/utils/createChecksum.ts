import crypto from 'crypto';

// Create MD5 checksum from title, URL, and page content
export const createChecksum = (url: string, content: string): string => {
  const data = `${url}|${content}`;
  return crypto.createHash('md5').update(data).digest('hex');
};
