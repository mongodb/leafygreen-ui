/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'child_process';
import path from 'path';

import { LintCommandOptions } from './lint.types';
// import { NpmPackageJsonLint } from 'npm-package-json-lint';
const rootDir = process.cwd();
const npmPkgLintConfigPath = path.resolve(
  __dirname,
  '../config/npmpackagejsonlintrc.config.js',
);

/** Spawns a npmPkgJsonLint job */
export function npmPkgJsonLint({
  fix,
  verbose,
}: Pick<LintCommandOptions, 'fix' | 'verbose'>) {
  return new Promise<void>((resolve, reject) => {
    console.log(chalk.yellow('Running npmPkgJsonLint...'));

    spawn('npmPkgJsonLint', [rootDir, '--configFile', npmPkgLintConfigPath], {
      cwd: rootDir,
      stdio: 'inherit',
    })
      .on('close', resolve)
      .on('error', reject);

    /* TODO: use the JS API */
  });
}
