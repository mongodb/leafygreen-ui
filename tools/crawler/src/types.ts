import { Embedding } from 'openai/resources/embeddings';

export interface CrawlerOptions {
  /** Verbose mode */
  verbose?: boolean;

  /** Max crawl depth (as a string) */
  depth?: string;

  /** Specific URL to crawl. If not provided, the crawler will scan all URLs defined in the config. */
  url?: string;

  /** Dry run mode - crawls without inserting into MongoDB */
  dryRun?: boolean;
}

/**
 * Interface for a single document in the MongoDB collection.
 * This is the format expected by our Credal MongoDB collection.
 */
export interface CrawlerDocument {
  Name: string;
  Body: string;
  Link: string;
  checksum: string;
  metadata?: {
    chunk_id: number;
    source_url: string;
    crawled_at: Date;
    [key: string]: any;
  };
}

export interface CrawlerDocumentWithEmbeddings extends CrawlerDocument {
  embedding: {
    [key: string]: Array<Embedding>;
  };
}
