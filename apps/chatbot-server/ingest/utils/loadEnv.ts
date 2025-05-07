import { strict as assert } from 'assert';
import dotenv from 'dotenv';

/**
  Load environment variables from a .env file at the given path.
  Note that if you change the environment variable names,
  you need to update this function to support those environment variables.
 */
export function loadEnvVars() {
  dotenv.config();
  const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_PROJECT_URL,
    MONGODB_APP_NAME,
    MONGODB_DATABASE_NAME,
    VECTOR_SEARCH_INDEX_NAME,
    OPENAI_API_KEY,
    OPENAI_EMBEDDING_MODEL,
  } = process.env;
  const requiredEnvVars = {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_PROJECT_URL,
    MONGODB_APP_NAME,
    MONGODB_DATABASE_NAME,
    VECTOR_SEARCH_INDEX_NAME,
    OPENAI_API_KEY,
    OPENAI_EMBEDDING_MODEL,
  } as const;

  for (const [name, value] of Object.entries(requiredEnvVars)) {
    assert(value, `${name} is required`);
  }

  const MONGODB_CONNECTION_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_PROJECT_URL}/?retryWrites=true&w=majority&appName=${MONGODB_APP_NAME}`;

  return {
    MONGODB_CONNECTION_URI,
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_PROJECT_URL,
    MONGODB_APP_NAME,
    MONGODB_DATABASE_NAME,
    VECTOR_SEARCH_INDEX_NAME,
    OPENAI_API_KEY,
    OPENAI_EMBEDDING_MODEL,
  } as Record<string, string>;
}
