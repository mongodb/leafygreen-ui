import { spawn } from 'child_process';
import chalk from 'chalk';
import path from 'path';
import { LintCommandOptions } from './lint.types';
// import { NpmPackageJsonLint } from 'npm-package-json-lint';
const rootDir = process.cwd();
const npmPkgLintConfigPath = path.resolve(
  __dirname,
  '../config/npmpackagejsonlintrc.config.js',
);

// const npmPackageJsonLinter = new NpmPackageJsonLint({
//   cwd: rootDir,
//   patterns: ['**/package.json'],
//   configFile: npmPkgLintConfigPath,
// });

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

    /*
    TODO: use the JS API
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
    */
  });
}
