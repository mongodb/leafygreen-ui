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

  // Perform a simple test to ensure the client can make requests
  try {
    // eslint-disable-next-line no-console
    console.log('✨ Testing Azure OpenAI client...');
    // We'll create a simple embedding test to ensure connectivity
    const testEmbeddingPromise = azureClient.embeddings.create({
      input: 'test connection',
      model: AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME,
    });

    // Set a timeout to catch if the request hangs
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error('Azure OpenAI client connection timed out')),
        5000,
      );
    });

    // Race the embedding request against the timeout
    void Promise.race([testEmbeddingPromise, timeoutPromise]).catch(error => {
      throw new Error(
        `Azure OpenAI client connectivity test failed: ${error.message}`,
      );
    });
  } catch (error) {
    throw new Error(
      `Failed to connect to Azure OpenAI: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  // eslint-disable-next-line no-console
  console.log('✅ Successfully connected to Azure OpenAI client');

  return azureClient;
  // This is a minimal request to validate connectivity
};
