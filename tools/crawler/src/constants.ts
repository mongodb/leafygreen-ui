import dotenv from 'dotenv';
dotenv.config();

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_PROJECT_URL,
  MONGODB_APP_NAME,
} = process.env;

export const MDB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_PROJECT_URL}/?retryWrites=true&w=majority&appName=${MONGODB_APP_NAME}`;
export const MDB_DB = 'rag-sources' as const;

export const EMBEDDING_MODEL_NAME = 'text-embedding-3-small';

export const SOURCES = [
  {
    url: 'https://mongodb.design',
    collection: 'mongodb-dot-design',
  },
  {
    url: 'https://react.dev/reference/react',
    collection: 'react-dev',
  },
  {
    url: 'https://developer.mozilla.org/en-US/docs/Web',
    collection: 'mdn',
  },
  {
    url: 'https://css-tricks.com/category/articles',
    collection: 'css-tricks',
  },
  {
    url: 'https://www.nngroup.com/articles',
    collection: 'nn-group',
  },
  {
    url: 'https://www.w3.org/WAI/standards-guidelines/wcag',
    collection: 'wcag',
  },
  {
    url: 'https://atomicdesign.bradfrost.com/table-of-contents',
    collection: 'atomic-design',
  },
] as const;

/**
 * Allow the crawler to follow links to these domains
 * (with restricted depth)
 */
export const allowedDomains = [
  'https://www.mongodb.com',
  'https://github.com',
] as const;
