import dotenv from 'dotenv';

import { createAzureOpenAIClient } from './utils/createAzureOpenAIClient';
import { EMBEDDING_MODEL_NAME } from './constants';
import { CrawlerDocument, CrawlerDocumentWithEmbeddings } from './types';

dotenv.config();

/**
 * Creates vector embeddings for a document.
 *
 * Following MongoDB's guide: https://www.mongodb.com/docs/atlas/atlas-vector-search/create-embeddings/
 *
 * @param doc The document to create embeddings for
 * @returns The same document with an embedding property added
 */
export const vectorize = async (
  doc: CrawlerDocument,
): Promise<CrawlerDocumentWithEmbeddings> => {
  const client = createAzureOpenAIClient();

  const response = await client.embeddings.create({
    input: [doc.Name, doc.Body, doc.Link],
    model: EMBEDDING_MODEL_NAME,
  });

  return {
    ...doc,
    embedding: {
      EMBEDDING_MODEL_NAME: response.data, // placeholder for the embedding
    },
  };
};
