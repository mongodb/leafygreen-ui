/* eslint-disable no-console */
import { eslint } from './eslint';
import { LintCommandOptions } from './lint.types';
import { npmPkgJsonLint } from './npmPkgJsonLint';
import { prettier } from './prettier';

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
    .then(() => {
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
};
