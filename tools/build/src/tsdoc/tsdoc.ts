/* eslint-disable no-console */
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

import { writeDocs } from './tsdocParser';

const rootDir = process.cwd();

// TODO:
// This script should run on a single package,
// and be a part of the turbo build process
// to take advantage of caching

const cli = new Command('parse-tsdoc')
  .arguments('[packages]')
  .option('-r, --root <path>', 'Source packages directory', './packages')
  .option(
    '-o, --out <path>',
    'Directory to write the doc files (must have the same component folder(s) as source)',
    './packages',
  )
  .parse(process.argv);

const packagesRoot = cli.opts()['root'];
const outDir = cli.opts()['out'];

/**
 * Main logic
 */
if (cli.args.length) {
  cli.args.forEach(generateDocFiles);
} else {
  const packagesDir = path.resolve(rootDir, packagesRoot);
  const packages = fs.readdirSync(packagesDir);
  packages.forEach(generateDocFiles);
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
