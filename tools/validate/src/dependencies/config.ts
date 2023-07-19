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

// We won't check dependencies imported by files matching these patterns
export const ignoreFilePatterns: Array<RegExp> = [
  /.*.spec.tsx?/,
  /.*.?stor(y|ies).(t|j)sx?/,
  /.*.stories.tsx?/,
  /.*.example.tsx?/,
  /.*.testutils.tsx?/,
  /.*\/dist\/.*/,
];

// these dependencies will be ignored when listed in a package.json
export const ignoreMatches = [
  '@lg-tools/*',
  '@leafygreen-ui/mongo-nav',
  'prop-types',
  '@storybook/*',
  '@testing-library/*',
  'jest-axe',
];

export const depcheckOptions: depcheck.Options = {
  ignoreMatches,
};
