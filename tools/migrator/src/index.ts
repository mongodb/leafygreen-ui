/* eslint-disable no-console */
import chalk from 'chalk';
import * as jscodeshift from 'jscodeshift/src/Runner';
// import fs from 'fs';
const fs = require('fs');
import { glob } from 'glob';
import path from 'path';

import { checkGitStatus } from './utils/checkGitStatus';

export interface MigrateOptions {
  dry?: boolean;
  print?: boolean;
  force?: boolean;
  stdin?: boolean;
  ignore?: Array<string>;
}

export const migrator = async (
  migration: string,
  files: string | Array<string>,
  options: MigrateOptions = {},
) => {
  console.log('😈', { options });
  // Gets the path of the migrations e.g: /Users/.../leafygreen-ui/tools/migrator/dist/migrations/[migration]/transform.js
  const migrationFile = path.join(
    __dirname,
    `./migrations/${migration}/transform.js`,
  );

  console.log(chalk.greenBright('Migration File:'), migrationFile);

  try {
    if (!fs.existsSync(migrationFile)) {
      throw new Error(
        `No migration found for ${migration}. The list of migrations can be found here: https://github.com/mongodb/leafygreen-ui/blob/main/tools/migrator/README.md#migrations`,
      );
    }

    if (!options.stdin && !files) {
      throw new Error(`No path provided for migration`);
    }

    if (!options.dry) {
      // Checks if the Git directory is in a "clean" state -- there are no uncommited changes or untracked files in the repo
      checkGitStatus(options.force);
    }

    const filepaths = glob.sync(files, { cwd: process.cwd() });

    if (filepaths.length === 0) {
      throw new Error(`No files found for ${files}`);
    }

    console.log(chalk.greenBright('filepaths:'), filepaths);
    console.log(chalk.greenBright('Running migration:'), migration);

    const { ignore, ...allOptions } = options;

    await jscodeshift.run(migrationFile, filepaths, {
      ignorePattern: [
        '**/node_modules/**',
        '**/.next/**',
        '**/build/**',
        '**/dist/**',
        ...(ignore ? ignore : []),
      ],
      extensions: 'tsx,ts,jsx,js',
      parser: 'tsx',
      verbose: 2,
      ...allOptions,
    });

    console.log(
      chalk.greenBright('🥬 Thank you for using @lg-tools/migrator!'),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
