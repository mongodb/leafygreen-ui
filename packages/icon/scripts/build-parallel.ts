/* eslint-disable no-console */
import { exec } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const ICON_DIR = path.resolve(process.cwd(), 'src/generated');

const iconNames = fs
  .readdirSync(ICON_DIR)
  .filter(f => /\.tsx?$/.test(f))
  .map(f => path.basename(f, path.extname(f)));

const BATCH_SIZE = 10;
const NUM_WORKERS = 4;

const DELIMITER = '|';
const ROLLUP_CONFIG_PATH = 'rollup.config.mjs';
const ROLLUP_BATCH_CONFIG_PATH = 'rollup.batch.config.mjs';

const program = new Command()
  .description('Split icon files into batches for bundling in parallel')
  .option('-v, --verbose', 'Enable verbose output', false)
  .parse();

const options = program.opts();

/** Splits an array into chunks of a specified size. */
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
async function buildBatch(batch: Array<string>): Promise<void> {
  const batchArg = batch.join(DELIMITER);
  const cmd = `pnpm exec rollup -c ${ROLLUP_BATCH_CONFIG_PATH} --environment "ICONS:${batchArg}"`;

  if (options.verbose) {
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
async function buildAllBatches(
  batchSize = 10,
  numWorkers = 4,
  fullBatch: Array<string>,
): Promise<void> {
  const { default: PQueue } = await import('p-queue');

  const queue = new PQueue({ concurrency: numWorkers });
  const batches = chunkArray(fullBatch, batchSize);

  for (const batch of batches) {
    queue.add(() => buildBatch(batch));
  }

  await queue.onIdle();
  console.log('All icons built successfully (°ロ°) !');
}

async function main(): Promise<void> {
  try {
    await buildExportsAndStories();
    await buildAllBatches(BATCH_SIZE, NUM_WORKERS, iconNames);
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

main();
