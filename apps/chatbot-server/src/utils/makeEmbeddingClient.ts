import { AzureOpenAI } from 'mongodb-rag-core/openai';

import { loadEnvVars } from './loadEnv';
import { testOpenAIClient } from './testOpenAIClient';

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
    AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME,
  } = loadEnvVars();

  const azureClient = new AzureOpenAI({
    endpoint: AZURE_OPENAI_ENDPOINT,
    apiKey: AZURE_OPENAI_API_KEY,
    apiVersion: '2024-04-01-preview',
    deployment: AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME,
  });

  // Validate the Azure client instance
  if (!azureClient) {
    throw new Error('Failed to initialize Azure OpenAI client.');
  }

  testOpenAIClient({
    client: azureClient,
    model: AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME,
    type: 'embedding',
  });

  // eslint-disable-next-line no-console
  console.log('✅ Successfully connected to Azure OpenAI client');

  return azureClient;
  // This is a minimal request to validate connectivity
};
