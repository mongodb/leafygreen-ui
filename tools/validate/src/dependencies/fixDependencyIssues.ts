import chalk from 'chalk';
import { SpawnOptions, spawnSync } from 'child_process';
import { writeFileSync } from 'fs';
import fetch from 'node-fetch';
import path from 'path';

import { DependencyIssues } from './config';
import { readPackageJson } from './utils';

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
) {
  const rootDir = process.cwd();

  const cmdOpts: SpawnOptions = { stdio: 'inherit', cwd: `packages/${pkg}` };
  // Using yarn 1.19.0 https://stackoverflow.com/questions/62254089/expected-workspace-package-to-exist-for-sane

  // Install any missing dependencies
  missingDependencies.length > 0 &&
    spawnSync('npx', ['yarn@1.19.0', 'add', ...missingDependencies], cmdOpts);

  // There's a bug in yarn@1.19.0 where some packages don't install as devDependencies
  // even if the `-D` flag is provided.
  // So we have to install devDependencies manually
  if (missingDevDependencies.length > 0) {
    const pkgJson = readPackageJson(pkg);

    const missingDevDepsObject = {} as { [key: string]: string };

    for (const depName of missingDevDependencies) {
      const searchUrl = `https://registry.npmjs.com/-/v1/search?text=${depName}`;
      const { objects }: any = await fetch(searchUrl).then(data => data.json());
      const pkgRef = objects
        ? objects.find((obj: any) => obj.package.name === depName)
        : null;

      if (!pkgRef) {
        console.error(chalk.red(`Could not find ${depName} on npm`));
        break;
      }

      const { version } = pkgRef.package;
      missingDevDepsObject[depName] = `^${version}`;
    }
    pkgJson.devDependencies = {
      ...pkgJson?.devDependencies,
      ...missingDevDepsObject,
    };

    if (pkgJson.devDependencies.length <= 0) {
      delete pkgJson.devDependencies;
    }

    const pkgJsonPath = path.resolve(rootDir, `packages`, pkg, `package.json`);
    writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
    spawnSync(`yarn`, ['install'], cmdOpts);
  }

  // Remove all unused dependencies
  const unused = [...unusedDependencies, ...unusedDevDependencies];
  unused.length > 0 &&
    spawnSync('npx', ['yarn@1.19.0', 'remove', ...unused], cmdOpts);

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
