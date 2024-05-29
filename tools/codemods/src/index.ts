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
  ignore?: Array<string>;
}

export const migrator = async (
  codemod: string,
  files: string | Array<string>,
  options: MigrateOptions = {},
) => {
  console.log('😈', { options });
  // Gets the path of the codemod e.g: /Users/.../leafygreen-ui/tools/codemods/dist/codemod/[codemod]/transform.js
  const codemodFile = path.join(
    __dirname,
    `./codemods/${codemod}/transform.js`,
  );

  console.log(chalk.greenBright('Codemod File:'), codemodFile);

  try {
    if (!fs.existsSync(codemodFile)) {
      throw new Error(
        `No codemod found for ${codemod}. The list of codemods can be found here: https://github.com/mongodb/leafygreen-ui/blob/main/tools/codemods/README.md#codemods-1`,
      );
    }

    if (!files) {
      throw new Error(`No path provided for codemod`);
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
    console.log(chalk.greenBright('Running codemod:'), codemod);

    const { ignore, ...allOptions } = options;

    await jscodeshift.run(codemodFile, filepaths, {
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
      chalk.greenBright('🥬 Thank you for using @lg-tools/codemods!'),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
