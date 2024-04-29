/* eslint-disable no-console */
import chalk from 'chalk';
// import fs from 'fs';
const fs = require('fs');
import { glob } from 'glob';
import * as jscodeshift from 'jscodeshift/src/Runner';
import path from 'path';

import { checkGitStatus } from './utils/checkGitStatus';

export interface MigrateOptions {
  dry?: boolean;
  print?: boolean;
  force?: boolean;
  stdin?: boolean;
  verbose?: 0 | 1 | 2;
}

export const migrator = async (
  migration: string,
  files: string | Array<string>,
  options: MigrateOptions = {},
) => {
  // Gets the path of the migrations e.g: /Users/.../leafygreen-ui/tools/migrator/dist/migrations/[migration]/transform.js
  const migrationFile = path.join(
    __dirname,
    `./migrations/${migration}/transform.js`,
  );

  console.log(chalk.greenBright('Migration File:'), migrationFile);

  try {
    if (!fs.existsSync(migrationFile)) {
      //TODO: add link
      throw new Error(
        `No migration found for ${migration}. The list of migrations can be found here: ADD LINK`,
      );
    }

    if (!options.stdin && !files) {
      throw new Error(`No path provided for migration`);
    }

    if (!options.dry) {
      // Checks if the Git repo is in a "clean" state -- there are no uncommited changes or untracked files in the repo
      checkGitStatus(options.force);
    }

    const filepaths = glob.sync(files, { cwd: process.cwd() });

    if (filepaths.length === 0) {
      throw new Error(`No files found for ${files}`);
    }

    console.log(chalk.greenBright('filepaths:'), filepaths);
    console.log(chalk.greenBright('Running migration:'), migration);

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

    console.log(
      chalk.greenBright('🥬 Thank you for using @lg-tools/migrator!'),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// packages/**/src/
