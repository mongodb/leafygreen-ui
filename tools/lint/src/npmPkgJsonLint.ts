/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'cross-spawn';

import { npmPkgLintConfigPath } from './config';
import { LintFn } from './lint.types';
// import { NpmPackageJsonLint } from 'npm-package-json-lint';
const rootDir = process.cwd();

/** Spawns a npmPkgJsonLint job */
export const npmPkgJsonLint: LintFn = ({ verbose }) => {
  return new Promise<boolean>((resolve, reject) => {
    console.log(chalk.yellow('Running npmPkgJsonLint...'));

    spawn('npmPkgJsonLint', [rootDir, '--configFile', npmPkgLintConfigPath], {
      cwd: rootDir,
      stdio: 'inherit',
    })
      .on('exit', code => {
        verbose &&
          console.log(`npmPkgJsonLint ${code === 0 ? 'passed' : 'failed'}`);

        resolve(!code);
      })
      .on('error', err => {
        console.error(chalk.red(`Error running npmPkgJsonLint`));
        verbose && console.error(err);

        reject(err);
      });

    /* TODO: use the JS API */
  });
};
