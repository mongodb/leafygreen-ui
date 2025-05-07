import {
  makeMongoDbEmbeddedContentStore,
  makeMongoDbPageStore,
  makeOpenAiEmbedder,
} from 'mongodb-rag-core';
import { AzureOpenAI } from 'mongodb-rag-core/openai';
import { Config, makeIngestMetaStore } from 'mongodb-rag-ingest';

import { loadEnvVars } from './utils/loadEnv';

// Load project environment variables
const {
  MONGODB_CONNECTION_URI,
  MONGODB_DATABASE_NAME,
  OPENAI_EMBEDDING_MODEL,
} = loadEnvVars();

export default {
  embedder: async () => {
    return makeOpenAiEmbedder({
      openAiClient: new AzureOpenAI({
        endpoint: process.env.AZURE_OPENAI_ENDPOINT,
        apiKey: process.env.AZURE_API_KEY1,
        deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
        apiVersion: '2024-04-01-preview',
      }),
      deployment: OPENAI_EMBEDDING_MODEL,
      backoffOptions: {
        numOfAttempts: 25,
        startingDelay: 1000,
      },
    });
  },
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
    return [];
    // const mongodbChatbotFrameworkSource =
    //   await mongoDbChatbotFrameworkDocsDataSourceConstructor();

    // const leafyGreenGithubSource = await leafygreenGithubSourceConstructor();

    // return [mongodbChatbotFrameworkSource, leafyGreenGithubSource];
  },
} satisfies Config;
