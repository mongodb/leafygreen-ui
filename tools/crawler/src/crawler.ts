/* eslint-disable no-console */
import chalk from 'chalk';

import { connectToMongoDB } from './utils/connectToMongoDB';
import { createCollectionNameFromURL } from './utils/createCollectionNameFromURL';
import { recursiveCrawlFromBaseURL } from './utils/recursiveCrawlFromBase';
import { SOURCES } from './constants';
import { CrawlerOptions } from './types';

export async function crawl(options: CrawlerOptions) {
  const { verbose = false, depth = '3', url, dryRun = false } = options;

  // Parse depth as integer
  const maxDepth = parseInt(depth, 10);

  try {
    // Connect to MongoDB
    const mongoClient = await connectToMongoDB();

    if (dryRun && verbose) {
      console.log(
        chalk.yellow(
          'Running in dry-run mode - no data will be inserted into MongoDB',
        ),
      );
    }

    // If a specific URL is provided, only crawl that one
    if (url) {
      const matchedSource = SOURCES.find(source => source.url === url);

      if (matchedSource) {
        verbose &&
          console.log(
            chalk.gray(
              `Crawling URL ${url} with collection name ${matchedSource.collection}`,
            ),
          );
        await recursiveCrawlFromBaseURL({
          baseUrl: url,
          collectionName: matchedSource.collection,
          mongoClient,
          maxDepth,
          verbose,
          dryRun,
        });
      } else {
        const newCollectionName = createCollectionNameFromURL(url);
        verbose &&
          console.log(
            chalk.gray(
              `URL ${url} not found in sources configuration. Creating new collection ${newCollectionName}`,
            ),
          );

        await recursiveCrawlFromBaseURL({
          baseUrl: url,
          collectionName: newCollectionName,
          mongoClient,
          maxDepth,
          verbose,
          dryRun,
        });
      }
    }
    // Otherwise crawl all sources
    else {
      verbose &&
        console.log(
          chalk.gray(`Crawling all ${SOURCES.length} configured sources`),
        );

      for (const source of SOURCES) {
        await recursiveCrawlFromBaseURL({
          baseUrl: source.url,
          collectionName: source.collection,
          mongoClient,
          maxDepth,
          verbose,
          dryRun,
        });
      }
    }

    // Close MongoDB connection
    await mongoClient.close();
    verbose && console.log(chalk.gray('Closed MongoDB connection'));
  } catch (error) {
    console.error('Error during crawl process:', error);
  }
}
