/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'child_process';
import path from 'path';

import { LintFn } from './lint.types';
// import { NpmPackageJsonLint } from 'npm-package-json-lint';
const rootDir = process.cwd();
const npmPkgLintConfigPath = path.resolve(
  __dirname,
  '../config/npmpackagejsonlintrc.config.js',
);

/** Spawns a npmPkgJsonLint job */
export const npmPkgJsonLint: LintFn = ({ fix, verbose }) => {
  return new Promise<boolean>((resolve, reject) => {
    console.log(chalk.yellow('Running npmPkgJsonLint...'));

    spawn('npmPkgJsonLint', [rootDir, '--configFile', npmPkgLintConfigPath], {
      cwd: rootDir,
      stdio: 'inherit',
    })
      .on('exit', code => {
        if (code === 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .on('error', reject);

    /* TODO: use the JS API */
  });
};
