import {
  makeMongoDbEmbeddedContentStore,
  makeMongoDbPageStore,
} from 'mongodb-rag-core';
import { AzureOpenAI } from 'mongodb-rag-core/openai';
import { Config, makeIngestMetaStore } from 'mongodb-rag-ingest';

import { createAzureEmbedderConstructor } from '../utils/createAzureEmbedderConstructor';
import { loadEnvVars } from '../utils/loadEnv';

import { leafygreenGithubSourceConstructor } from './sources/github-leafygreen-ui';
import { mongoDbChatbotFrameworkDocsDataSourceConstructor } from './sources/github-mdb-chatbot-framework';
import { webSourceConstructor } from './utils/webSourceConstructor';

// Load project environment variables
const {
  MONGODB_CONNECTION_URI,
  MONGODB_DATABASE_NAME,
  OPENAI_EMBEDDING_MODEL,
  AZURE_OPENAI_API_KEY,
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_DEPLOYMENT,
} = loadEnvVars();

export default {
  embedder: createAzureEmbedderConstructor({
    azureClient: new AzureOpenAI({
      endpoint: AZURE_OPENAI_ENDPOINT,
      apiKey: AZURE_OPENAI_API_KEY,
      apiVersion: '2024-04-01-preview',
      deployment: AZURE_OPENAI_DEPLOYMENT,
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
      ...[
        'https://mongodb.design',
        'https://react.dev/reference/react',
        'https://developer.mozilla.org/en-US/docs/Web',
        'https://css-tricks.com/category/articles',
        'https://www.nngroup.com/articles',
        'https://www.w3.org/WAI/standards-guidelines/wcag',
        'https://atomicdesign.bradfrost.com/table-of-contents',
      ].map(source => webSourceConstructor(source, {})),
      mongoDbChatbotFrameworkDocsDataSourceConstructor(),
      leafygreenGithubSourceConstructor(),
    ]);
  },
} satisfies Config;
