/* eslint-disable no-console */
import chalk from 'chalk';
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Packages to exclude from typesVersions updates
// These packages are CLI-only, and don't need to be down-leveled
const EXCLUDED_PACKAGES = [
  '@lg-tools/build',
  '@lg-tools/cli',
  '@lg-tools/create',
  '@lg-tools/install',
  '@lg-tools/link',
  '@lg-tools/slackbot',
  '@lg-tools/build',
  '@lg-tools/test',
  '@lg-tools/update',
  '@lg-tools/validate',
];

// Currently we don't downlevel TS
const TYPES_VERSIONS_CONFIG = {};

/**
 * Updates the `typesVersions` field in all package.json files
 *
 * Run this script if we need to change the TypeScript downleveling.
 *
 * The current build script parses the `typesVersions` field
 * to determine which TypeScript version to use for downleveling.
 */
async function updateTypesVersions() {
  try {
    console.log('Updating typesVersions in package.json files...');

    // Find the repository root (assuming this script is in tools/build/scripts)
    const repoRoot = path.resolve(__dirname, '../../../');

    // Find all package.json files in the packages directory from the repo root
    const packageJsonPaths = await glob('**/package.json', {
      cwd: repoRoot,
      absolute: true,
    });

    console.log(`Found ${packageJsonPaths.length} packages`);

    // Process each package.json file
    for (const filePath of packageJsonPaths) {
      // Read the file
      const content = await readFile(filePath, 'utf-8');
      const packageJson = JSON.parse(content);

      const packageName = packageJson.name;

      if (EXCLUDED_PACKAGES.includes(packageName)) {
        console.log(chalk.gray(`\tSkipping excluded package: ${packageName}`));
        continue;
      }

      console.log(chalk.gray(`\tProcessing ${packageName}`));

      // Update the typesVersions field
      packageJson.typesVersions = TYPES_VERSIONS_CONFIG;

      // Write the updated content back to the file
      const updatedContent = JSON.stringify(packageJson, null, 2) + '\n';
      await writeFile(filePath, updatedContent);
    }

    console.log('Successfully updated typesVersions in all package.json files');
  } catch (error) {
    console.error('Error updating typesVersions:', error);
    process.exit(1);
  }
}

// Execute the function
updateTypesVersions();
