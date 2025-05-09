/* eslint-disable no-console */
import chalk from 'chalk';

import { connectToMongoDB } from './utils/connectToMongoDB';
import { MDB_DB, SOURCES } from './constants';

interface PruneOptions {
  /** Verbose mode */
  verbose?: boolean;

  /** Dry run mode - doesn't actually delete documents */
  dryRun?: boolean;

  /** Number of days to keep documents for (default: 7) */
  days?: string;
}

/**
 * Prune documents older than the specified number of days from all collections
 */
export async function prune(options: PruneOptions) {
  const { verbose = false, dryRun = false, days = '7' } = options;
  const daysToKeep = parseInt(days, 10);

  try {
    // Connect to MongoDB
    const mongoClient = await connectToMongoDB();
    const db = mongoClient.db(MDB_DB);

    if (dryRun && verbose) {
      console.log(
        chalk.yellow(
          'Running in dry-run mode - no documents will be deleted from MongoDB',
        ),
      );
    }

    // Calculate the date threshold (now - days)
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - daysToKeep);

    verbose &&
      console.log(
        chalk.gray(
          `Pruning documents older than ${daysToKeep} days (before ${thresholdDate.toISOString()})`,
        ),
      );

    // Process each collection defined in SOURCES
    for (const source of SOURCES) {
      const collection = db.collection(source.collection);

      // Find documents with crawled_at date older than the threshold
      const query = {
        'metadata.crawled_at': { $lt: thresholdDate },
      };

      // Count documents that match the query
      const count = await collection.countDocuments(query);

      if (count === 0) {
        verbose &&
          console.log(
            chalk.gray(
              `No documents to prune in collection ${source.collection}`,
            ),
          );
        continue;
      }

      verbose &&
        console.log(
          chalk.gray(
            `Found ${count} documents to prune in collection ${source.collection}`,
          ),
        );

      if (!dryRun) {
        // Delete the documents
        const result = await collection.deleteMany(query);
        console.log(
          chalk.green(
            `✂️ Pruned ${result.deletedCount} documents from collection ${source.collection}`,
          ),
        );
      } else {
        console.log(
          chalk.yellow(
            `[DRY RUN] Would prune ${count} documents from collection ${source.collection}`,
          ),
        );
      }
    }

    // Close MongoDB connection
    await mongoClient.close();
    verbose && console.log(chalk.gray('Closed MongoDB connection'));
  } catch (error) {
    console.error('Error during prune process:', error);
  }
}
