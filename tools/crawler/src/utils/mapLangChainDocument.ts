import { Document as LangChainDocument } from '@langchain/core/documents';

import { CrawlerDocument } from '../types';

/**
 * Map a LangChain document to the custom CrawlerDocument format.
 */
export const makeLangChainDocumentMapper =
  ({
    title,
    href,
    checksum,
  }: {
    title: string;
    href: string;
    checksum: string;
  }) =>
  (doc: LangChainDocument, index: number): CrawlerDocument => ({
    Name: title || `${href} - Chunk ${index}`,
    Body: doc.pageContent,
    Link: href,
    checksum,
    metadata: {
      ...doc.metadata,
      chunk_id: index,
      source_url: href,
      crawled_at: new Date(),
    },
  });
