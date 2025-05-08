/* eslint-disable no-console */
import { recursiveCrawlFromBaseURL } from '@lg-tools/crawler';
import { Page } from 'mongodb-rag-core';
import { type DataSource } from 'mongodb-rag-core/dataSources';

export interface WebSourceConstructorOptions {
  maxDepth?: number;
  verbose?: boolean;
}

/**
 * Returns a constructor function
 * that creates a web source
 */
export async function webSourceConstructor(
  source: string,
  options?: WebSourceConstructorOptions,
): Promise<DataSource> {
  const { maxDepth = 3, verbose = false } = {
    maxDepth: 3,
    verbose: false,
    ...options,
  };
  return {
    name: source,
    fetchPages: async () => {
      verbose && console.log(`🐶 Fetching source ${source}`);
      const pages: Array<Page> = [];

      await recursiveCrawlFromBaseURL(
        ({ document, title, href }) => {
          verbose && console.log(`🪲 Crawled page ${title} - ${href}`);
          pages.push({
            url: href,
            title,
            body: document.pageContent,
            format: 'txt',
            sourceName: source,
            metadata: {
              id: document.id,
              ...document.metadata,
            },
          });
        },
        {
          baseUrl: source,
          maxDepth,
          verbose,
          enableRecursion: true,
        },
      );

      return pages;
    },
  };
}
