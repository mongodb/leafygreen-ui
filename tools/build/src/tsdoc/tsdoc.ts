/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import { writeDocs } from './tsdocParser';

const rootDir = process.cwd();

// TODO:
// This script should run on a single package,
// and be a part of the turbo build processs
// to take advantage of caching

const packagesRoot = './packages';
const outDir = './packages';

export function tsdoc() {
  /**
   * Main logic
   */
  console.log('TSDoc', { rootDir });
  if (false) {
    const packagesDir = path.resolve(rootDir, packagesRoot);
    const packages = fs.readdirSync(packagesDir);
    packages.forEach(generateDocFiles);
  }
}

/**
 * Parses TSDocs and writes to file
 * @param componentName string
 */
function generateDocFiles(componentName: string): void {
  writeDocs(
    componentName,
    path.resolve(rootDir, packagesRoot),
    path.resolve(rootDir, outDir),
  );
}
