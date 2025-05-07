import {
  makeMongoDbEmbeddedContentStore,
  makeMongoDbPageStore,
} from 'mongodb-rag-core';
import { AzureOpenAI } from 'mongodb-rag-core/openai';
import { Config, makeIngestMetaStore } from 'mongodb-rag-ingest';

import { leafygreenGithubSourceConstructor } from './sources/github-leafygreen-ui';
import { mongoDbChatbotFrameworkDocsDataSourceConstructor } from './sources/github-mdb-chatbot-framework';
import { createAzureEmbedderConstructor } from './utils/createAzureEmbedderConstructor';
import { loadEnvVars } from './utils/loadEnv';

// Load project environment variables
const {
  // BRAINTRUST_API_KEY,
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
    ]);
  },
} satisfies Config;
