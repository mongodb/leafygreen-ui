import { makeOpenAiEmbedder } from 'mongodb-rag-core';

import { loadEnvVars } from './loadEnv';
import { makeEmbeddingClient } from './makeEmbeddingClient';

/**
 * Returns an consistent Azure OpenAI embedder
 * used in the ingest process
 * and in the chatbot server.
 */
export const makeEmbedder = () => {
  const { AZURE_OPENAI_DEPLOYMENT } = loadEnvVars();

  const azureClient = makeEmbeddingClient();

  return makeOpenAiEmbedder({
    openAiClient: azureClient,
    deployment: AZURE_OPENAI_DEPLOYMENT,
    backoffOptions: {},
  });
};
