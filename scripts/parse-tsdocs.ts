/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { Command } from 'commander';

import {writeDocs} from './utils/tsDocParser'

const cli = new Command('parse-tsdoc')
  .arguments('[packages]')
  .option('-r, --root <path>', 'Source packages directory', '../packages')
  .option(
    '-o, --out <path>',
    'Directory to write the doc files (must have the same component folder(s) as source)',
    '../packages',
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
  const packagesDir = path.resolve(__dirname, packagesRoot);
  const packages = fs.readdirSync(packagesDir);
  packages.forEach(generateDocFiles);
}

/**
 * Parses TSDocs and writes to file
 * @param componentName string
 */
function generateDocFiles(componentName: string): void {
  writeDocs(componentName, path.resolve(__dirname, packagesRoot), path.resolve(__dirname, outDir));
}
