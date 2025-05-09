import { AzureOpenAI } from 'mongodb-rag-core/openai';

import { loadEnvVars } from './loadEnv';

/**
 * Returns an consistent Azure OpenAI client
 * that can be used to generate embeddings.
 *
 * Used in the ingest process
 * and in the chatbot server.
 */
export const makeEmbeddingClient = () => {
  // Load project environment variables
  const {
    AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_DEPLOYMENT,
  } = loadEnvVars();

  const azureClient = new AzureOpenAI({
    endpoint: AZURE_OPENAI_ENDPOINT,
    apiKey: AZURE_OPENAI_API_KEY,
    apiVersion: '2024-04-01-preview',
    deployment: AZURE_OPENAI_DEPLOYMENT,
  });

  return azureClient;
};
