/* eslint-disable no-console */
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const iconDir = path.resolve(process.cwd(), 'src/generated');

const iconNames = fs
  .readdirSync(iconDir)
  .filter(f => /\.tsx?$/.test(f))
  .map(f => path.basename(f, path.extname(f)));

function chunkArray<T>(arr: Array<T>, size: number): Array<Array<T>> {
  const chunks: Array<Array<T>> = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}

function buildBatch(batch: Array<string>): Promise<void> {
  return new Promise((resolve, reject) => {
    const iconsArg = batch.join(',');
    const cmd = `pnpm exec rollup -c rollup.icon.batch.config.mjs --environment ICONS:${iconsArg}`;
    console.log(`Building batch: ${iconsArg}`);

    const proc = exec(cmd);

    proc.stdout?.pipe(process.stdout);
    proc.stderr?.pipe(process.stderr);

    proc.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Batch build failed for icons: ${iconsArg} with code ${code}`,
          ),
        );
      }
    });
  });
}

async function buildAllIconsBatched(batchSize = 10, concurrency = 4) {
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

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  console.log('All icon batches built successfully');
}

buildAllIconsBatched(10, 4).catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
