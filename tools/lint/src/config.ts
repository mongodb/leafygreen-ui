import { ESLint } from 'eslint';
import path from 'path';

/*******************
 ****** ESLint *****
 *******************/

/** ESLint config path */
export const eslintConfigPath = path.resolve(
  __dirname,
  '../config/eslint.config.mjs',
);

export const esLintExtensions = ['ts', 'tsx'];

// Create an instance of ESLint with the configuration passed to the function
export function createESLintInstance(fix: boolean): ESLint {
  return new ESLint({
    overrideConfigFile: eslintConfigPath,
    fix,
  });
}

/*******************
 ***** Prettier ****
 *******************/
export const prettierConfigPath = path.resolve(
  __dirname,
  '../config/prettier.config.js',
);

export const prettierExtensions = [
  ...esLintExtensions,
  'mjs',
  'json',
  'md',
  'yml',
];

export const prettierIgnorePath = path.resolve(
  process.cwd(),
  '.prettierignore',
);

/*******************
 *** packageJson ***
 *******************/
export const npmPkgLintConfigPath = path.resolve(
  __dirname,
  '../config/npmpackagejsonlintrc.config.js',
);
