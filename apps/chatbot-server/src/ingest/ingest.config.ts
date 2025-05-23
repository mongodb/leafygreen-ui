import {
  makeMongoDbEmbeddedContentStore,
  makeMongoDbPageStore,
} from 'mongodb-rag-core';
import { Config, makeIngestMetaStore } from 'mongodb-rag-ingest';

import { loadEnvVars } from '../utils/loadEnv';
import { makeEmbedder } from '../utils/makeEmbedder';

import { leafygreenGithubSourceConstructor } from './sources/github-leafygreen-ui';
import { webSourceConstructor } from './utils/webSourceConstructor';

// Load project environment variables
const {
  MONGODB_CONNECTION_URI,
  MONGODB_DATABASE_NAME,
  AZURE_OPENAI_EMBEDDING_MODEL,
} = loadEnvVars();

export default {
  embedder: () => makeEmbedder(),
  embeddedContentStore: () =>
    makeMongoDbEmbeddedContentStore({
      connectionUri: MONGODB_CONNECTION_URI,
      databaseName: MONGODB_DATABASE_NAME,
      searchIndex: {
        embeddingName: AZURE_OPENAI_EMBEDDING_MODEL,
      },
    }),
  pageStore: () =>
    makeMongoDbPageStore({
      connectionUri: MONGODB_CONNECTION_URI,
      databaseName: MONGODB_DATABASE_NAME,
    }),
  ingestMetaStore: () =>
    makeIngestMetaStore({
      connectionUri: MONGODB_CONNECTION_URI,
      databaseName: MONGODB_DATABASE_NAME,
      entryId: 'all',
    }),
  chunkOptions: () => ({
    minChunkSize: 15,
    maxChunkSize: 1000,
    overlap: 100,
  }),
  // Add data sources here
  dataSources: async () => {
    return Promise.all([
      ...[
        'https://mongodb.design',
        'https://react.dev/reference/react',
        'https://developer.mozilla.org/en-US/docs/Web',
        'https://css-tricks.com/category/articles',
        'https://www.nngroup.com/articles',
        'https://www.w3.org/WAI/standards-guidelines/wcag',
        'https://atomicdesign.bradfrost.com/table-of-contents',
      ].map(source => webSourceConstructor(source, {})),
      leafygreenGithubSourceConstructor(),
    ]);
  },
} satisfies Config;
