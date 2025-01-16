import depcheck from 'depcheck';

import { readPackageJson } from './utils';

export interface DepCheckFunctionProps {
  pkgName: string;
  pkgJson: ReturnType<typeof readPackageJson>;
  importedPackages: depcheck.Results['using'];
}

export interface DependencyIssues {
  missingDependencies: Array<string>;
  missingDevDependencies: Array<string>;
  unusedDependencies: Array<string>;
  unusedDevDependencies: Array<string>;
  listedDevButUsedAsDependency: Array<string>;
  listedButOnlyUsedAsDev: Array<string>;
  isMissingPeers: boolean;
}

/**
 * Treat packages imported by these files as `devDependencies`
 */
export const devFilePatterns: Array<RegExp> = [
  /.*scripts\/.*/,
  /.*.stories.js/,
  /.*.spec.tsx?/,
  /.*.?stor(y|ies).(t|j)sx?/,
  /.*.stories.tsx?/,
  /.*.example.tsx?/,
  /.*.test(-?[uU])til(itie)?s((.tsx?)|(\/.*))/,
  /.*\/test(ing|-?[uU]til(itie)?s)?\//g,
  /.*\/dist\/.*/,
];

/** If a dependency is flagged as being imported by one of these files, ignore it */
export const ignoreFilePatterns: Array<RegExp> = [
  /.*package.json?/,
  /.*README.md/,
  /.*CHANGELOG.md/,
  /.*.(input|output).(t|j)sx?/,
];

/**
 * These are globally available dev dependencies.
 *
 * Packages that omit these dependencies will not be flagged for missing dependencies.
 *
 * Packages that list these dependencies will not be flagged for unused dependencies
 */
export const externalDependencies = [
  '@babel/*',
  '@emotion/*',
  '@leafygreen-ui/mongo-nav',
  '@leafygreen-ui/testing-lib',
  '@rollup/*',
  '@storybook/*',
  '@svgr/*',
  '@testing-library/*',
  '@types/*',
  '@typescript-eslint/*',
  'buffer',
  'eslint*',
  'jest',
  'jest-*',
  'jest-axe',
  'prettier*',
  'react-*',
  'rollup*',
  'storybook-*',
  'typescript',
  '*-loader',
  '*-lint*',
];

/**
 * These are directories that should be ignored when running depcheck
 */
export const patternsToIgnore = [
  'tools/codemods/src/codemods/*/tests',
  'tools/codemods/src/utils/transformations/*/tests',
];

export const depcheckOptions: depcheck.Options = {
  ignoreMatches: externalDependencies,
  ignorePatterns: patternsToIgnore,
};
