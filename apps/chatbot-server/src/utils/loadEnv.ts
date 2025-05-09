import { strict as assert } from 'assert';
import dotenv from 'dotenv';

/**
  Load environment variables from a .env file at the given path.
  Note that if you change the environment variable names,
  you need to update this function to support those environment variables.
 */
export function loadEnvVars() {
  dotenv.config({});
  const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_PROJECT_URL,
    MONGODB_APP_NAME,
    MONGODB_DATABASE_NAME,
    VECTOR_SEARCH_INDEX_NAME,
    AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_EMBEDDING_MODEL,
    AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME,
    AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_URL,
    AZURE_OPENAI_CHAT_COMPLETION_MODEL,
    AZURE_OPENAI_API_CHAT_COMPLETION_DEPLOYMENT_NAME,
    AZURE_OPENAI_API_CHAT_COMPLETION_DEPLOYMENT_URL,
    CREDAL_BASE_URL,
    CREDAL_API_TOKEN,
    CREDAL_AGENT_ID,
    CREDAL_USER_EMAIL,
    KANOPY_BINARY_PATH,
  } = process.env;
  const requiredEnvVars = {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_PROJECT_URL,
    MONGODB_APP_NAME,
    MONGODB_DATABASE_NAME,
    VECTOR_SEARCH_INDEX_NAME,
    AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_EMBEDDING_MODEL,
    AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_NAME,
    AZURE_OPENAI_API_EMBEDDING_DEPLOYMENT_URL,
    AZURE_OPENAI_CHAT_COMPLETION_MODEL,
    AZURE_OPENAI_API_CHAT_COMPLETION_DEPLOYMENT_NAME,
    AZURE_OPENAI_API_CHAT_COMPLETION_DEPLOYMENT_URL,
    CREDAL_BASE_URL,
    CREDAL_API_TOKEN,
    CREDAL_AGENT_ID,
    CREDAL_USER_EMAIL,
    KANOPY_BINARY_PATH,
  } as const;

  for (const [name, value] of Object.entries(requiredEnvVars)) {
    assert(value, `${name} is required`);
  }

  const encodedMongodbUser = encodeURIComponent(MONGODB_USER || '');
  const encodedMongodbPassword = encodeURIComponent(MONGODB_PASSWORD || '');
  const encodedMongodbProjectUrl = encodeURIComponent(
    MONGODB_PROJECT_URL || '',
  );
  const encodedMongodbAppName = encodeURIComponent(MONGODB_APP_NAME || '');
  const MONGODB_CONNECTION_URI = `mongodb+srv://${encodedMongodbUser}:${encodedMongodbPassword}@${encodedMongodbProjectUrl}/?retryWrites=true&w=majority&appName=${encodedMongodbAppName}`;

  return {
    ...requiredEnvVars,
    MONGODB_CONNECTION_URI,
  } as Record<keyof typeof requiredEnvVars, string> & {
    MONGODB_CONNECTION_URI: string;
  };
}
