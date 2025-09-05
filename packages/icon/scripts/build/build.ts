/* eslint-disable no-console */
import { buildPackage } from '@lg-tools/build';
import { Command } from 'commander';

import { buildBatch } from './build-batch';
import { getAllIcons, getChangedIcons } from './compare-checksum';
import { BATCH_SIZE, NUM_WORKERS } from './constants';

interface BuildIconOptions {
  verbose?: boolean;
  force?: boolean;
}

/**
 * Splits an array into chunks of a specified size.
 */
function chunkArray<T>(arr: Array<T>, size: number): Array<Array<T>> {
  const chunks: Array<Array<T>> = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}

/**
 * Runs the Rollup build command for index and story files.
 */
async function buildIndex({ verbose }: { verbose?: boolean }): Promise<void> {
  buildPackage({ direct: true, verbose });
}

/**
 * Splits a list into batches, then uses a concurrency-limited queue to
 * build all batches in parallel. Waits until all batches have finished.
 */
async function buildAllBatches({
  fullBatch,
  batchSize = 10,
  numWorkers = 4,
  verbose = false,
}: {
  fullBatch: Array<string>;
  batchSize: number;
  numWorkers: number;
  verbose?: boolean;
}): Promise<void> {
  const { default: PQueue } = await import('p-queue');

  const queue = new PQueue({ concurrency: numWorkers });
  const batches = chunkArray(fullBatch, batchSize);

  verbose && console.log(`Building ${batches.length} batches...`);
  for (const batch of batches) {
    queue.add(() => buildBatch(batch, verbose));
  }

  await queue.onIdle();
}

/**
 * Builds the icon assets.
 * @param options The options for building icons.
 */
async function buildIcons(options: BuildIconOptions): Promise<void> {
  try {
    const verbose = options.verbose ?? false;
    const force = options.force ?? false;

    await buildIndex({ verbose });

    const iconsToBuild = force ? getAllIcons() : getChangedIcons();

    verbose && console.log(`Building ${iconsToBuild} icons...`);

    await buildAllBatches({
      fullBatch: iconsToBuild,
      batchSize: BATCH_SIZE,
      numWorkers: NUM_WORKERS,
      verbose,
    });
    console.log('All icons built successfully (°ロ°) !');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

new Command()
  .description('Split icon files into batches for bundling in parallel')
  .option('-v, --verbose', 'Enable verbose output', false)
  .action(buildIcons)
  .parse();
