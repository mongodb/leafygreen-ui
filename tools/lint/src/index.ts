import { eslint } from './eslint';
import { LintCommandOptions } from './lint.types';
import { npmPkgJsonLint } from './npmPkgJsonLint';
import { prettier } from './prettier';

const isTrue = (test: any) => !!test;

export const lint = (options: LintCommandOptions) => {
  const { fix, prettierOnly, eslintOnly, pkgJsonOnly, verbose } = options;

  const linters: Array<Promise<unknown>> = [];

  if (!prettierOnly && !pkgJsonOnly) {
    linters.push(eslint({ fix, verbose }));
  }

  if (!eslintOnly && !pkgJsonOnly) {
    linters.push(prettier({ fix, verbose }));
  }

  if (!prettierOnly && !eslintOnly) {
    linters.push(npmPkgJsonLint({ fix, verbose }));
  }

  Promise.all(linters)
    .then(results => {
      if (results.every(isTrue)) {
        process.exit(0);
      }

      const total = results.length;
      const successes = results.filter(isTrue).length;
      verbose && console.error(`${successes} of ${total} linters passing`);

      process.exit(1);
    })
    .catch(err => {
      console.error(`Error resolving linter(s)`);
      console.error(err);
      process.exit(1);
    });
};
