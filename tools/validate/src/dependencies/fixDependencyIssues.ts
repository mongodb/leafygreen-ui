/* eslint-disable no-console */
import type { SpawnOptions } from 'child_process';
import { sync as spawnSync } from 'cross-spawn';

import { DependencyIssues } from '../validate.types';

export async function fixDependencies(
  pkg: string,
  {
    missingDependencies,
    missingDevDependencies,
    unusedDependencies,
    unusedDevDependencies,
    listedDevButUsedAsDependency,
    listedButOnlyUsedAsDev,
    isMissingPeers,
  }: DependencyIssues,
  verbose?: boolean,
) {
  verbose && console.log(`Fixing issues with ${pkg}`);
  const spawnContext: SpawnOptions = {
    stdio: 'inherit',
    cwd: `packages/${pkg}`,
  };
  // Using yarn 1.19.0 https://stackoverflow.com/questions/62254089/expected-workspace-package-to-exist-for-sane

  // Install any missing dependencies
  if (Object.keys(missingDependencies).length > 0) {
    verbose &&
      console.log(
        'Installing missing dependencies...',
        Object.keys(missingDependencies).join(', '),
      );
    spawnSync(
      'npx',
      ['yarn@1.19.0', 'add', ...Object.keys(missingDependencies)],
      spawnContext,
    );
  }

  // Install any missing devDependencies
  if (Object.keys(missingDevDependencies).length > 0) {
    // const pkgJson = readPackageJson(pkg);

    verbose &&
      console.log(
        `Fixing devDependency issues with ${pkg}.`,
        Object.keys(missingDevDependencies).join(', '),
      );

    spawnSync(
      'npx',
      ['yarn@1.19.0', 'add', '--dev', ...Object.keys(missingDevDependencies)],
      spawnContext,
    );
  }

  // Remove all unused dependencies
  const unused = [...unusedDependencies, ...unusedDevDependencies];

  if (unused.length > 0) {
    verbose && console.log('Removing unused dependencies...', unused);
    spawnSync('npx', ['yarn@1.19.0', 'remove', ...unused], spawnContext);
  }

  // TODO: Autofix these
  if (
    Object.keys(listedDevButUsedAsDependency).length > 0 ||
    Object.keys(listedButOnlyUsedAsDev).length > 0 ||
    isMissingPeers
  ) {
    console.log(
      'You will need to fix any improperly listed dependencies manually.',
    );
  }
}
