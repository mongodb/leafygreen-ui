import chalk from 'chalk';
// import fs from 'fs';
const fs = require('fs');
import { glob } from 'glob';
import * as jscodeshift from 'jscodeshift/src/Runner';
import path from 'path';

export interface MigrateOptions {
  dry?: boolean;
  print?: boolean;
  force?: boolean;
  stdin?: boolean;
}

export const migrator = async (
  migration: string,
  files: string | Array<string>,
  options: MigrateOptions = {},
) => {
  // eslint-disable-next-line no-console
  console.log(chalk.green('Running migration:'), migration);

  console.log({ options });

  const migrationFile = path.join(
    __dirname,
    `./migrations/${migration}/transform.js`,
  );

  console.log(chalk.redBright('Migration File:'), migrationFile);

  const filepaths = glob.sync(files, { cwd: process.cwd() });

  console.log(chalk.magenta('filepaths:'), filepaths);

  if (filepaths.length === 0) {
    throw new Error(`No files found for ${files}`);
  }

  try {
    if (!fs.existsSync(migrationFile)) {
      throw new Error(`No migration found for ${migration}`);
    }

    await jscodeshift.run(migrationFile, filepaths, {
      babel: true,
      ignorePattern: ['**/node_modules/**', '**/.next/**', '**/build/**'],
      extensions: 'tsx,ts,jsx,js',
      parser: 'tsx',
      verbose: 2,
      silent: false,
      stdin: false,
      ...options,
    });

    console.log(chalk.blueBright('👍🏽👍🏽👍🏽👍🏽👍🏽'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
};
