/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'child_process';
import { Command } from 'commander';
import path from 'path';

import { npmPkgJsonLint } from './npmPkgJsonLint';

const rootDir = process.cwd();
const eslintConfigPath = path.resolve(__dirname, '../config/eslint.config.js');
const prettierConfigPath = path.resolve(
  __dirname,
  '../config/prettier.config.js',
);

const esLintExtensions = ['js', 'ts', 'tsx'];
const prettierExtensions = [...esLintExtensions, 'mjs', 'json', 'md', 'yml'];

interface LintFlags {
  fix: boolean;
  eslintOnly: boolean;
  prettierOnly: boolean;
  pkgJsonOnly: boolean;
  verbose: boolean;
}

const cli = new Command()
  .option('-f, --fix', 'fix linting errors', false)
  .option('-e, --eslintOnly', 'run eslint only', false)
  .option('-p, --prettierOnly', 'run prettier only', false)
  .option('--pkgJsonOnly', 'run npmPackageJsonLint only', false)
  .option('--verbose', 'verbose mode', false)
  .parse(process.argv);

const { fix, prettierOnly, eslintOnly, pkgJsonOnly, verbose } =
  cli.opts() as LintFlags;

// If prettierOnly or eslintOnly is true, run only that linter
if (prettierOnly || eslintOnly || pkgJsonOnly) {
  let lintPromise: Promise<unknown>;

  if (eslintOnly) {
    lintPromise = eslint();
  } else if (prettierOnly) {
    lintPromise = prettier();
  } else {
    lintPromise = npmPkgJsonLint(fix);
  }
  lintPromise.then(() => process.exit(0));
} else {
  // Otherwise, run all linters
  (async () => {
    await eslint();
    await prettier();
    await npmPkgJsonLint(fix);
  })();
}

/** Spawns an eslint job */
function eslint() {
  return new Promise<void>(resolve => {
    console.log(chalk.blue('Running ESLint...'));
    spawn(
      'eslint',
      [
        '--config',
        eslintConfigPath,
        `${rootDir}/**/*.{${esLintExtensions.join(',')}}`,
        fix ? '--fix' : '--no-fix',
        verbose ? '' : '--quiet',
      ],
      {
        stdio: 'inherit',
      },
    ).on('close', resolve);
  });
}

/** Spawns a prettier job */
function prettier() {
  return new Promise<void>(resolve => {
    console.log(chalk.magenta('Running Prettier...'));
    spawn(
      'prettier',
      [
        fix ? '--write' : '--check',
        '--config',
        prettierConfigPath,
        `${rootDir}/**/*.{${prettierExtensions.join(',')}}`,
      ],
      {
        stdio: 'inherit',
      },
    ).on('close', resolve);
  });
}
