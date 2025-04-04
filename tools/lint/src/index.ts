/* eslint-disable no-console */
import chalk from 'chalk';
import { runESLint } from './eslint';
import { LintCommandOptions } from './lint.types';
import { npmPkgJsonLint } from './npmPkgJsonLint';
import { runPrettier } from './prettier';
export { formatLG } from './format';

const isTrue = (test: any) => !!test;

export const lint = (options: LintCommandOptions) => {
  const { fix, prettierOnly, eslintOnly, pkgJsonOnly, verbose } = options;

  if (verbose) {
    console.log('Linting with options:', options);
  }

  const linters: Array<Promise<unknown>> = [];

  if (!prettierOnly && !pkgJsonOnly) {
    linters.push(runESLint({ fix, verbose }));
  }

  if (!eslintOnly && !pkgJsonOnly) {
    linters.push(runPrettier({ fix, verbose }));
  }

  if (!prettierOnly && !eslintOnly) {
    linters.push(npmPkgJsonLint({ fix, verbose }));
  }

  Promise.all(linters)
    .then(results => {
      if (results.every(isTrue)) {
        console.log(chalk.green('All linters passed'));
        process.exit(0);
      }

      const total = results.length;
      const successes = results.filter(isTrue).length;
      console.error(chalk.red(`${successes} of ${total} linters passing`));
      verbose && console.log(results);
      process.exit(1);
    })
    .catch(err => {
      console.error(`Error resolving linter(s)`);
      console.error(err);
      process.exit(1);
    });
};
