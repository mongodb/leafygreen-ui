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

/** We treat dependencies imported by files matching these patterns as devDependencies */
export const devFilePatterns: Array<RegExp> = [
  /.*scripts\/.*/,
  /.*.stories.js/,
  /.*.spec.tsx?/,
  /.*.?stor(y|ies).(t|j)sx?/,
  /.*.stories.tsx?/,
  /.*.example.tsx?/,
  /.*.testutils.tsx?/,
  /.*\/dist\/.*/,
];

/** If a dependency is flagged as being imported by one of these files, ignore it */
export const ignoreFilePatterns: Array<RegExp> = [
  /.*package.json?/,
  /.*README.md/,
  /.*CHANGELOG.md/,
];

/**
 * These dependencies will be ignored when listed in a package.json.
 * These are globally available dev dependencies.
 * We don't want every component flagged for not having
 * these packages explicitly declared in its package.json
 */
export const ignoreDependencies = [
  '@leafygreen-ui/mongo-nav',
  '@babel/*',
  '@emotion/*',
  '@rollup/*',
  '@storybook/*',
  '@svgr/*',
  '@testing-library/*',
  '@types/*',
  '@typescript-*',
  'buffer',
  'eslint*',
  'jest*',
  'jest-axe',
  'prettier*',
  'prop-types',
  'react-*',
  'rollup*',
  'storybook-*',
  '*-loader',
  '*-lint*',
];

export const depcheckOptions: depcheck.Options = {
  ignoreMatches: ignoreDependencies,
};
