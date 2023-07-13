/* eslint-disable no-console */
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { parseTSDoc } from './tsdocParser';

// In this case, rootDir will be the root of a package itself
const rootDir = process.cwd();
const outDir = rootDir; // TODO: allow different outDirs

export function tsdoc() {
  const docs = parseTSDoc(rootDir);
  const docString = JSON.stringify(docs, null, 2);
  const outFilePath = path.resolve(process.cwd(), outDir, 'tsdoc.json');

  try {
    console.log(
      chalk.blueBright(
        `Writing tsdoc.json `,
        chalk.gray(`(${(Buffer.byteLength(docString) / 1024).toFixed(2)}kb)`),
      ),
    );
    outDir !== rootDir &&
      console.log(`\tWriting to ${chalk.gray(outFilePath)}`);
    fs.writeFileSync(outFilePath, docString);
  } catch (err) {
    console.error(chalk.red(`Could not write file to ${outFilePath}`), err);
  }
}
