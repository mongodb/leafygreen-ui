import {
  makeMongoDbEmbeddedContentStore,
  makeMongoDbPageStore,
} from 'mongodb-rag-core';
import { AzureOpenAI } from 'mongodb-rag-core/openai';
import { Config, makeIngestMetaStore } from 'mongodb-rag-ingest';

import { leafygreenGithubSourceConstructor } from './sources/github-leafygreen-ui.js';
import { mongoDbChatbotFrameworkDocsDataSourceConstructor } from './sources/github-mdb-chatbot-framework.js';
import { createAzureEmbedderConstructor } from './utils/createAzureEmbedderConstructor.js';
import { loadEnvVars } from './utils/loadEnv.js';
import { webSourceConstructor } from './utils/webSourceConstructor.js';

// Load project environment variables
const {
  MONGODB_CONNECTION_URI,
  MONGODB_DATABASE_NAME,
  OPENAI_EMBEDDING_MODEL,
} = loadEnvVars();

export default {
  embedder: createAzureEmbedderConstructor({
    azureClient: new AzureOpenAI({
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      apiKey: process.env.AZURE_API_KEY1,
      apiVersion: '2024-04-01-preview',
      deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
    }),
    model: OPENAI_EMBEDDING_MODEL,
  }),
  embeddedContentStore: () =>
    makeMongoDbEmbeddedContentStore({
      connectionUri: MONGODB_CONNECTION_URI,
      databaseName: MONGODB_DATABASE_NAME,
      searchIndex: {
        embeddingName: OPENAI_EMBEDDING_MODEL,
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
  // Add data sources here
  dataSources: async () => {
    return Promise.all([
      mongoDbChatbotFrameworkDocsDataSourceConstructor(),
      leafygreenGithubSourceConstructor(),
      ...[
        'https://mongodb.design',
        'https://react.dev/reference/react',
        'https://developer.mozilla.org/en-US/docs/Web',
        'https://css-tricks.com/category/articles',
        'https://www.nngroup.com/articles',
        'https://www.w3.org/WAI/standards-guidelines/wcag',
        'https://atomicdesign.bradfrost.com/table-of-contents',
      ].map(source => webSourceConstructor(source, {})),
    ]);
  },
} satisfies Config;
