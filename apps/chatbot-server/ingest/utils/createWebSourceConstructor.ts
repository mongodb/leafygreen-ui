/* eslint-disable no-console */
import { recursiveCrawlFromBaseURL } from '@lg-tools/crawler';
import { Page } from 'mongodb-rag-core';
import { type DataSource } from 'mongodb-rag-core/dataSources';

/**
 * Returns a constructor function
 * that creates a web source
 */
export function createWebSourceConstructor(
  source: string,
): () => Promise<DataSource> {
  const webSourceConstructor = async (): Promise<DataSource> => {
    return {
      name: source,
      fetchPages: async () => {
        console.log(`🐶 Fetching source ${source}`);
        const pages: Array<Page> = [];

        await recursiveCrawlFromBaseURL(
          ({ document, title, href }) => {
            console.log(`🪲 Crawled page ${title} - ${href}`);
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
            maxDepth: 3,
            enableRecursion: true,
            verbose: true,
          },
        );

        return pages;
      },
    };
  };

  return webSourceConstructor;
}
