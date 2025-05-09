import dotenv from 'dotenv';
import { AzureOpenAI } from 'openai';

dotenv.config();

/**
 * Creates and returns an Azure OpenAI client instance
 * configured with environment variables.
 *
 * @returns Configured Azure OpenAI client
 */
export const createAzureOpenAIClient = (): AzureOpenAI => {
  const options = {
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.AZURE_API_KEY1,
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
    apiVersion: '2024-04-01-preview',
  };

  return new AzureOpenAI(options);
};
