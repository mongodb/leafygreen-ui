import {
  makeMongoDbEmbeddedContentStore,
  makeMongoDbPageStore,
  makeOpenAiEmbedder,
} from 'mongodb-rag-core';
import { OpenAI } from 'mongodb-rag-core/openai';
import { Config, makeIngestMetaStore } from 'mongodb-rag-ingest';
import path from 'path';

import { leafygreenGithubSourceConstructor } from './LGGithubDataSource';
import { loadEnvVars } from './loadEnvVars';
import { mongoDbChatbotFrameworkDocsDataSourceConstructor } from './mongodbChatbotFrameworkDataSource';

// Load project environment variables
const dotenvPath = path.join(__dirname, '..', '..', '..', '.env'); // .env at project root
const {
  BRAINTRUST_API_KEY,
  MONGODB_CONNECTION_URI,
  MONGODB_DATABASE_NAME,
  OPENAI_API_KEY,
  OPENAI_EMBEDDING_MODEL,
} = loadEnvVars(dotenvPath);

export default {
  embedder: async () => {
    return makeOpenAiEmbedder({
      openAiClient: new OpenAI({ apiKey: OPENAI_API_KEY }),
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
    const mongodbChatbotFrameworkSource =
      await mongoDbChatbotFrameworkDocsDataSourceConstructor();

    const leafyGreenGithubSource = await leafygreenGithubSourceConstructor();

    return [mongodbChatbotFrameworkSource, leafyGreenGithubSource];
  },
} satisfies Config;
