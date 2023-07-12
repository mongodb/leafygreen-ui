import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import {
  NpmPackageJsonLint,
  PackageJsonFileLintingResult,
} from 'npm-package-json-lint';

const rootDir = process.cwd();
const npmPkgLintConfigPath = path.resolve(
  __dirname,
  '../config/npmpackagejsonlintrc.config.js',
);

const npmPackageJsonLinter = new NpmPackageJsonLint({
  cwd: rootDir,
  patterns: ['**/package.json'],
  configFile: npmPkgLintConfigPath,
});

/** Spawns a npmPkgJsonLint job */
export function npmPkgJsonLint(fix: boolean) {
  return new Promise<void>((resolve, reject) => {
    console.log(chalk.yellow('Running npmPkgJsonLint...'));

    const { results, errorCount } = npmPackageJsonLinter.lint();

    results.forEach(result => {
      if (result.issues.length > 0) {
        console.log(chalk.bold(`\nFound issues in ${result.filePath}`));
        result.issues.forEach(issue => {
          const color = issue.severity === 'error' ? chalk.red : chalk.yellow;
          console.log(color(issue.severity + ': ' + issue.lintMessage));
        });
      }
    });

    if (errorCount > 0) {
      reject('Errors found in package.json');
    } else {
      resolve();
    }
  });
}
