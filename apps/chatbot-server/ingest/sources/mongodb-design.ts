/**
 * @fileoverview Data source for the MongoDB Design website (mongodb.design)
 */
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { DataSource, DataSourcePage, Page } from 'mongodb-rag-core';

/**
 * Creates a data source for the MongoDB Design website
 */
export const mongoDbDesignDataSourceConstructor =
  async (): Promise<DataSource> => {
    return {
      name: 'mongodb-design-website',
      metadata: {
        productName: 'MongoDB Design System',
        version: '1.0.0',
        tags: ['design', 'ui', 'components', 'leafygreen'],
      },

      async *getPages(): AsyncGenerator<DataSourcePage> {
        // Base URL for MongoDB Design website
        const baseUrl = 'https://www.mongodb.design';

        // Define the sections/paths to crawl
        const pagesToCrawl = [
          '/component',
          '/guidelines',
          '/foundation',
          '/resources',
        ];

        // Process each top-level page
        for (const pagePath of pagesToCrawl) {
          const pageUrl = `${baseUrl}${pagePath}`;
          try {
            // Use LangChain's CheerioWebBaseLoader to fetch and parse the page content
            const loader = new CheerioWebBaseLoader(pageUrl, {
              selector: 'body',
            });

            // Load the content and clean it up
            const cheerio = await loader.scrape();

            // Remove script and style tags to clean up content
            cheerio('script').remove();
            cheerio('style').remove();
            cheerio('noscript').remove();

            // Get the page title
            const title =
              cheerio('title').text() ||
              cheerio('h1').first().text() ||
              pagePath.split('/').pop() ||
              'MongoDB Design';

            // Get the main content
            const content = cheerio('body').text();

            // Split text into chunks for better processing
            const textSplitter = new RecursiveCharacterTextSplitter({
              chunkSize: 1000,
              chunkOverlap: 200,
            });

            const chunks = await textSplitter.splitText(content);

            // Find component links if we're on the components page
            if (pagePath === '/component') {
              // Extract all component links
              const componentLinks = cheerio('a')
                .map((_i, el) => {
                  const href = cheerio(el).attr('href');
                  if (
                    href &&
                    href.startsWith('/component/') &&
                    href.includes('/live-example')
                  ) {
                    return href;
                  }
                  return null;
                })
                .get()
                .filter(Boolean) as string[];

              // Process each component page
              for (const componentLink of componentLinks) {
                yield* await processComponentPage(`${baseUrl}${componentLink}`);
              }
            }

            // Create and yield the page
            for (let i = 0; i < chunks.length; i++) {
              const pageData: Page = {
                url: pageUrl,
                title: `${title} - Part ${i + 1}`,
                content: chunks[i],
                metadata: {
                  source: 'mongodb-design',
                  section: pagePath.substring(1),
                  chunkIndex: i,
                },
              };

              yield {
                page: pageData,
              };
            }
          } catch (error) {
            console.error(`Error processing ${pageUrl}:`, error);
          }
        }
      },
    };
  };

/**
 * Helper function to process individual component pages
 */
async function* processComponentPage(
  url: string,
): AsyncGenerator<DataSourcePage> {
  try {
    // Load the component page
    const loader = new CheerioWebBaseLoader(url, {
      selector: 'body',
    });

    const cheerio = await loader.scrape();

    // Clean up the content
    cheerio('script').remove();
    cheerio('style').remove();
    cheerio('noscript').remove();

    // Extract component name from URL
    const componentName = url
      .split('/component/')[1]
      .split('/')[0]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const title =
      cheerio('title').text() ||
      cheerio('h1').first().text() ||
      componentName ||
      'Component';

    const content = cheerio('body').text();

    // Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunks = await textSplitter.splitText(content);

    // Create and yield the page
    for (let i = 0; i < chunks.length; i++) {
      const pageData: Page = {
        url,
        title: `${title} - Part ${i + 1}`,
        content: chunks[i],
        metadata: {
          source: 'mongodb-design',
          section: 'component',
          componentName,
          chunkIndex: i,
        },
      };

      yield {
        page: pageData,
      };
    }
  } catch (error) {
    console.error(`Error processing component page ${url}:`, error);
  }
}
