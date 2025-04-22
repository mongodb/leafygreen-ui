/* eslint-disable no-console */
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import { DOWNLEVEL_VERSIONS, EXCLUDED_PACKAGES } from './TYPES_VERSIONS';

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

    // Construct the base typesVersions field
    const typesVersions: Record<string, Record<string, Array<string>>> = {
      '*': {
        '.': ['./index.d.ts'],
      },
    };

    // Construct the exports field with types conditions
    let exportsField = packageJson.exports || { '.': {} };

    // If exports field is a string, convert it to an object
    if (typeof exportsField === 'string') {
      exportsField = { '.': exportsField };
    }

    // Ensure the main export path exists
    if (!exportsField['.']) {
      exportsField['.'] = {};
    } else if (typeof exportsField['.'] === 'string') {
      // If the main export is a string, convert it to an object
      const mainExport = exportsField['.'];
      exportsField['.'] = {
        import: mainExport,
        require: mainExport,
      };
    }

    // set the default types export
    if (!exportsField['.'].types) {
      exportsField['.'].types = './index.d.ts';
    }

    // Add entries for each TypeScript version we support
    DOWNLEVEL_VERSIONS.forEach(({ condition, target }) => {
      // Add to typesVersions if target is less than 4.9
      // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#exports-is-prioritized-over-typesversions
      if (parseFloat(target) < 4.9) {
        typesVersions[condition] = {
          '.': [`./ts${target}/index.d.ts`],
        };
      }

      // Add to exports field with types condition
      if (typeof exportsField['.'] === 'object') {
        exportsField['.'][`types${condition}`] = `./ts${target}/index.d.ts`;
      }
    });

    // Update package.json
    packageJson.typesVersions = typesVersions;

    // TODO: Add this once the multiple exports PR is merged
    // packageJson.exports = exportsField;

    // Write the updated package.json
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n',
    );

    console.log(
      verbose &&
        chalk.green.bold(`Updated typesVersions and exports in ${packageName}`),
    );
  } catch (error) {
    console.error(chalk.red('Error updating typesVersions:'), error);
  }
}
