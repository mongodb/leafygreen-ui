/* eslint-disable no-console */
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const TYPES_VERSIONS_CONFIG = {
  '<5.0': {
    '*': ['dist/ts4.9/*'],
  },
};

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
    console.log(`Repository root: ${repoRoot}`);

    // Find all package.json files in the packages directory from the repo root
    const packageJsonPaths = await glob('packages/*/package.json', {
      cwd: repoRoot,
      absolute: true,
    });

    console.log(`Found ${packageJsonPaths.length} package.json files`);

    // Process each package.json file
    for (const filePath of packageJsonPaths) {
      console.log(`Processing ${path.relative(repoRoot, filePath)}`);

      // Read the file
      const content = await readFile(filePath, 'utf-8');
      const packageJson = JSON.parse(content);

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
