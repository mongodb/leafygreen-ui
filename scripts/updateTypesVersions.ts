/* eslint-disable no-console */
import { getLGConfig } from '@lg-tools/meta';
import chalk from 'chalk';
import fs from 'fs';
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

updateAllTypesVersions();

/**
 * Updates the `typesVersions` field in a package's package.json files
 *
 * Run this script if we need to change the TypeScript downleveling.
 *
 * The current build script parses the `typesVersions` field
 * to determine which TypeScript version to use for downleveling.
 */
async function updateAllTypesVersions() {
  try {
    const { scopes } = getLGConfig();

    // for each scope,
    // get the packages in that scope
    // and run updateTypesVersionsForPackage
    for (const scope in scopes) {
      const scopePath = scopes[scope];
      const scopeDir = path.join(process.cwd(), scopePath);
      console.log(`Processing scope: ${scope}: ${scopeDir}`);

      const packageDirs = fs
        .readdirSync(scopeDir)
        .filter(dir => fs.statSync(path.join(scopeDir, dir)).isDirectory());

      // Process each package directory
      for (const pkg of packageDirs) {
        console.log(`Processing package: ${chalk.green(pkg)}`);
        const dir = path.join(scopeDir, pkg);
        await updateTypesVersionsForPackage(dir);
      }
    }
  } catch (error) {
    console.error('Error updating typesVersions:', error);
    process.exit(1);
  }
}

async function updateTypesVersionsForPackage(cwd: string) {
  try {
    // Find all package.json files in the packages directory from the repo root
    const packageJsonPath = path.join(cwd, 'package.json');

    // Read the file
    const content = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(content);

    const { name: packageName } = packageJson;

    if (EXCLUDED_PACKAGES.includes(packageName)) {
      console.log(chalk.gray(`\tSkipping excluded package: ${packageName}`));
      return;
    }

    // Update the typesVersions field
    packageJson.typesVersions = TYPES_VERSIONS_CONFIG;

    // Write the updated content back to the file
    const updatedContent = JSON.stringify(packageJson, null, 2) + '\n';
    await writeFile(packageJsonPath, updatedContent);

    console.log(
      `Successfully updated \`typesVersions\` in ${chalk.bold(
        packageName,
      )} to ${chalk.gray(JSON.stringify(packageJson.typesVersions, null, 2))}`,
    );
  } catch (error) {
    console.error('Error updating typesVersions:', error);
    process.exit(1);
  }
}
