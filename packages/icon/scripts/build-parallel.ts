/* eslint-disable no-console */
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

/** Gets directory path to generated .tsx files per icon. */
const iconDir = path.resolve(process.cwd(), 'src/generated');

/** Gets list of icon names based on the generated .tsx files. */
const iconNames = fs
  .readdirSync(iconDir)
  .filter(f => /\.tsx?$/.test(f))
  .map(f => path.basename(f, path.extname(f)));

/** Splits an array into chunks of a specified size. */
function chunkArray<T>(arr: Array<T>, size: number): Array<Array<T>> {
  const chunks: Array<Array<T>> = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}

/** Uses Rollup to build a batch of icons, given an array of their names. */
function buildBatch(batch: Array<string>): Promise<void> {
  return new Promise((resolve, reject) => {
    const DELIMITER = '|';
    const ROLLUP_CONFIG_PATH = 'rollup.batch.config.mjs';

    const iconsArg = batch.join(DELIMITER);
    // console.log(`Building batch: ${iconsArg}`);

    const cmd = `pnpm exec rollup -c ${ROLLUP_CONFIG_PATH} --environment "ICONS:${iconsArg}"`;
    const proc = exec(cmd);
    proc.on('close', code =>
      code === 0
        ? resolve()
        : reject(
            new Error(
              `Batch build failed for icons: ${iconsArg} with code ${code}`,
            ),
          ),
    );
  });
}

/** Creates async functions to build all icons in batches. */
async function buildAllIconsBatched(batchSize = 10, numWorkers = 4) {
  const batches = chunkArray(iconNames, batchSize);
  let index = 0;

  async function worker() {
    while (index < batches.length) {
      const currentIndex = index;
      index++;

      try {
        await buildBatch(batches[currentIndex]);
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }

  const workers = Array.from({ length: numWorkers }, () => worker());
  await Promise.all(workers);

  console.log('All icon batches built successfully');
}

buildAllIconsBatched(10, 4).catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
