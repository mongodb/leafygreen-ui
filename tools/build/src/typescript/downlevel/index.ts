/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { downlevelDts } from './downlevel-dts';
import { DOWNLEVEL_VERSIONS, EXCLUDED_PACKAGES } from './TYPES_VERSIONS';
import { updatePackageJsonTypes } from './updatePackageJsonTypes';

interface DownlevelCommandOptions {
  verbose?: boolean;
  update?: boolean;
}

/**
 * Downlevel TypeScript definitions
 * based on the typesVersions field in package.json.
 *
 * @param options.verbose - Enable verbose logging
 * @param options.update - When true, updates the package.json typesVersions and exports fields
 */
export function runTypescriptDownlevel({
  verbose,
  update = false,
}: DownlevelCommandOptions) {
  const packageDir = process.cwd();
  console.log('\nRunning TypeScript downlevel...', packageDir);

  const packageJsonPath = path.join(packageDir, 'package.json');
  const packageJsonContent = fse.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonContent);
  const { name: packageName } = packageJson;

  // Skip excluded packages
  if (EXCLUDED_PACKAGES.includes(packageName)) {
    console.log(chalk.gray(`\tSkipping excluded package: ${packageName}`));
    return;
  }

  if (DOWNLEVEL_VERSIONS && DOWNLEVEL_VERSIONS?.length > 0) {
    // Only update typesVersions and exports in package.json when flag is true
    if (update) {
      console.log(
        chalk.blue('Updating package.json typesVersions and exports fields...'),
      );
      updatePackageJsonTypes(packageDir, { verbose });
    }

    // Then generate downlevelled TypeScript declaration files
    DOWNLEVEL_VERSIONS.forEach(({ target }) => {
      downlevelDts({ verbose, target });
    });
  } else {
    verbose &&
      console.log(chalk.yellow('No downlevel versions configured'), {
        DOWNLEVEL_VERSIONS,
      });
  }
}
