/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { parseTSDoc } from './tsdocParser';

/**
 * Builds TSDoc file(s) for the current directory
 */
export function buildTSDoc() {
  const packageDir = process.cwd();
  const outDir = packageDir; // TODO: Consider allowing different outDirs

  const docs = parseTSDoc(packageDir);
  const docString = JSON.stringify(docs, null, 2);
  const outFilePath = path.resolve(process.cwd(), outDir, 'tsdoc.json');

  try {
    console.log(
      chalk.blueBright(
        `Writing tsdoc.json `,
        chalk.gray(`(${(Buffer.byteLength(docString) / 1024).toFixed(2)}kb)`),
      ),
    );
    outDir !== packageDir &&
      console.log(`\tWriting to ${chalk.gray(outFilePath)}`);
    fse.writeFileSync(outFilePath, docString);
  } catch (err) {
    console.error(chalk.red(`Could not write file to ${outFilePath}`), err);
  }
}
