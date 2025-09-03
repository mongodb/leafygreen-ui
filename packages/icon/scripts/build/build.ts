/* eslint-disable no-console */
import { exec } from 'child_process';
import { Command } from 'commander';
import path from 'path';

import { DELIMITER } from '../constants';

import { getChangedChecksums } from './compare-checksum';

const BATCH_SIZE = 10;
const NUM_WORKERS = 4;

const ROLLUP_CONFIG_PATH = path.resolve(__dirname, '../../rollup.config.mjs');
const ROLLUP_BATCH_CONFIG_PATH = path.resolve(
  __dirname,
  '../rollup.batch.config.mjs',
);

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
async function buildExportsAndStories(): Promise<void> {
  const cmd = `pnpm exec rollup -c ${ROLLUP_CONFIG_PATH}`;

  await new Promise<void>((resolve, reject) => {
    exec(cmd, error => {
      if (error) {
        reject(new Error(`Exports and stories build failed: ${error.message}`));
      } else {
        resolve();
      }
    });
  });
}

/**
 * Runs the Rollup build command for a batch of icons.
 */
async function buildBatch(
  batch: Array<string>,
  verbose = false,
): Promise<void> {
  const batchArg = batch.join(DELIMITER);
  const cmd = `pnpm exec rollup -c ${ROLLUP_BATCH_CONFIG_PATH} --environment "ICONS:${batchArg}"`;

  if (verbose) {
    console.log(`Building icon batch: ${batch.join(', ')}`);
  }

  await new Promise<void>((resolve, reject) => {
    exec(cmd, error => {
      if (error) {
        reject(new Error(`Batch build failed: ${error.message}`));
      } else {
        resolve();
      }
    });
  });
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

  for (const batch of batches) {
    queue.add(() => buildBatch(batch, verbose));
  }

  await queue.onIdle();
}

async function buildChangedIcons(options: { verbose: boolean }): Promise<void> {
  try {
    const iconsToBuild = getChangedChecksums();
    const verbose = options.verbose;

    await buildExportsAndStories();
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
  .action(buildChangedIcons)
  .parse();
