import { makeOpenAiEmbedder } from 'mongodb-rag-core';

import { loadEnvVars } from './loadEnv';
import { makeEmbeddingClient } from './makeEmbeddingClient';

/**
 * Returns an consistent Azure OpenAI embedder
 * used in the ingest process
 * and in the chatbot server.
 */
export const makeEmbedder = () => {
  const { AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME } = loadEnvVars();

  const azureClient = makeEmbeddingClient();

  const embedder = makeOpenAiEmbedder({
    openAiClient: azureClient,
    deployment: AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME,
    backoffOptions: {},
  });

  return embedder;
};
