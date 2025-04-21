/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { downlevelDts } from './downlevel-dts';
import { DOWNLEVEL_VERSIONS, EXCLUDED_PACKAGES } from './TYPES_VERSIONS';
import { updateTypesVersions } from './updateTypesVersions';

interface DownlevelCommandOptions {
  verbose?: boolean;
}

/**
 * Downlevel TypeScript definitions
 * based on the typesVersions field in package.json.
 */
export function runTypescriptDownlevel({ verbose }: DownlevelCommandOptions) {
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
    // First update typesVersions and exports in package.json
    updateTypesVersions(packageDir, { verbose });

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
