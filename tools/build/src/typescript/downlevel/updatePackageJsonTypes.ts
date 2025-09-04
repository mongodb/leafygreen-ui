/* eslint-disable no-console */
import chalk from 'chalk';
import fs from 'fs';
import cloneDeep from 'lodash/cloneDeep';
import path from 'path';

import {
  DEFAULT_TYPES_EXPORT_PATH,
  DOWNLEVEL_VERSIONS,
  EXCLUDED_PACKAGES,
} from './TYPES_VERSIONS';

/**
 * Updates the `typesVersions` and `exports` fields in a package's package.json file
 * based on the TypeScript downlevel versions we support.
 *
 * For TS targets < 4.9, it adds a `typesVersions` field with the downlevelled
 * TypeScript declaration files.
 * For TS targets >= 4.9, it adds an `exports` field with the types condition.
 *
 * e.g.
 * ```json
 * {
 *   "typesVersions": {
 *     "*": {
 *       ".": ["./index.d.ts"]
 *     },
 *     "<4.8": {
 *       ".": ["./ts4.0/index.d.ts"]
 *     }
 *   },
 *   "exports": {
 *     ".": {
 *       "import": "./index.d.ts",
 *       "require": "./index.d.ts",
 *       "types<4.8": "./ts4.0/index.d.ts",
 *       "types<5.0": "./ts4.9/index.d.ts"
 *     }
 *   }
 * }
 * ```
 */
export function updatePackageJsonTypes(
  packageDir: string = process.cwd(),
  { verbose }: { verbose?: boolean } = {},
) {
  try {
    const packageJsonPath = path.join(packageDir, 'package.json');

    // Check if package.json exists
    if (!fs.existsSync(packageJsonPath)) {
      console.log(chalk.yellow(`No package.json found in ${packageDir}`));
      return;
    }

    // Read the package.json file
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);

    const { name: packageName } = packageJson;

    // Skip excluded packages
    if (EXCLUDED_PACKAGES.includes(packageName)) {
      verbose &&
        console.log(chalk.gray(`\tSkipping excluded package: ${packageName}`));
      return;
    }

    const typesExportPath = path.join(DEFAULT_TYPES_EXPORT_PATH, 'index.d.ts');

    // Construct the exports field with types conditions
    let packageExports = cloneDeep(packageJson.exports);

    // If exports field is a string, convert it to an object
    if (typeof packageExports === 'string' || !packageExports) {
      packageExports = { '.': packageExports };
    }

    // Ensure the main export path exists
    if (!packageExports['.']) {
      packageExports['.'] = {
        import: packageJson.module ?? '',
        require: packageJson.main ?? '',
        types: packageJson.types ?? '',
      };
    } else if (typeof packageExports['.'] === 'string') {
      // If the main export is a string, convert it to an object
      const mainExport = packageExports['.'];
      packageExports['.'] = {
        import: mainExport,
        require: mainExport,
      };
    }

    // set the default types export
    if (!packageExports['.'].types) {
      packageExports['.'].types = typesExportPath;
    }

    // Construct the base typesVersions field
    const typesVersions: Record<string, Record<string, Array<string>>> = {};

    // Add entries for each TypeScript version we support
    DOWNLEVEL_VERSIONS.forEach(({ condition, target }) => {
      const downlevelExportPath = `./${path.join(
        DEFAULT_TYPES_EXPORT_PATH,
        `ts${target}`,
        'index.d.ts',
      )}`;

      // Add to typesVersions if target is less than 4.9
      // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#packageExports-is-prioritized-over-typesversions
      if (parseFloat(target) < 4.9) {
        typesVersions[condition] = {
          '.': [downlevelExportPath],
        };
      }

      // Add to packageExports field with types condition
      if (typeof packageExports['.'] === 'object') {
        packageExports['.'][`types@${condition}`] = downlevelExportPath;
      }
    });

    // Update package.json
    packageJson.typesVersions = typesVersions;
    packageJson.exports = packageExports;

    // Write the updated package.json
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n',
    );

    verbose &&
      console.log(
        chalk.green.bold(`Updated typesVersions and exports in ${packageName}`),
      );
  } catch (error) {
    console.error(chalk.red('Error updating typesVersions:'), error);
  }
}
