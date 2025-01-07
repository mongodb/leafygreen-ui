/* eslint-disable no-console */
import type { SpawnOptions } from 'child_process';
import { sync as spawnSync } from 'cross-spawn';

import { DependencyIssues } from './config';

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

  // Install any missing dependencies
  if (missingDependencies.length > 0) {
    verbose &&
      console.log('Installing missing dependencies...', missingDependencies);
    spawnSync(
      'npx',
      ['pnpm@9.15.0', 'add', ...missingDependencies],
      spawnContext,
    );
  }

  // Install any missing devDependencies
  if (missingDevDependencies.length > 0) {
    // const pkgJson = readPackageJson(pkg);

    verbose &&
      console.log(
        `Fixing devDependency issues with ${pkg}.`,
        missingDevDependencies,
      );

    spawnSync(
      'npx',
      ['pnpm@9.15.0', 'add', '--dev', ...missingDevDependencies],
      spawnContext,
    );
  }

  // Remove all unused dependencies
  const unused = [...unusedDependencies, ...unusedDevDependencies];

  if (unused.length > 0) {
    verbose && console.log('Removing unused dependencies...', unused);
    spawnSync('npx', ['pnpm@9.15.0', 'remove', ...unused], spawnContext);
  }

  // TODO: Autofix these
  if (
    listedDevButUsedAsDependency.length > 0 ||
    listedButOnlyUsedAsDev.length > 0 ||
    isMissingPeers
  ) {
    console.log(
      'You will need to fix any improperly listed dependencies manually.',
    );
  }
}
