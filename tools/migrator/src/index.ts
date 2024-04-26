import chalk from 'chalk';
// import fs from 'fs';
const fs = require('fs');
import { glob } from 'glob';
import * as jscodeshift from 'jscodeshift/src/Runner';
import path from 'path';
// import isGitClean from 'is-git-clean';

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

    // eslint-disable-next-line no-console
    console.log(chalk.green('Running migration:'), migration);

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

// export function checkGitStatus(force?: boolean) {
//   let clean = false;
//   let errorMessage = 'Unable to determine if git directory is clean';

//   try {
//     clean = isGitClean.sync(process.cwd());
//     errorMessage = 'Git directory is not clean';
//   } catch (err: any) {
//     if (err && err.stderr && err.stderr.indexOf('Not a git repository') >= 0) {
//       clean = true;
//     }
//   }

//   if (!clean) {
//     /* eslint-disable no-console */
//     if (force) {
//       console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
//     } else {
//       console.log('Thank you for using @shopify/polaris-migrator!');
//       console.log(
//         chalk.yellow(
//           '\nBut before we continue, please stash or commit your git changes.',
//         ),
//       );
//       console.log(
//         '\nYou may use the --force flag to override this safety check.',
//       );
//       process.exit(1);
//     }
//     /* eslint-enable no-console */
//   }
// }
