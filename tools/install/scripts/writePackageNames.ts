/* eslint-disable no-console */
import { getAllPackageNames } from '@lg-tools/meta';
import fse from 'fs-extra';
import path from 'path';

const PACKAGE_NAMES_FILE_PATH = '../src/ALL_PACKAGES.ts'

writeAllPackageNames();

/**
 * Scan the repository for all leafygreen packages and write their names to a static file
 * This file will be used by the install script instead of fetching from NPM
 * @returns The array of package names that were written to the file
 */
function writeAllPackageNames(): Array<string> {
  try {
    // Get all package names from the repository
    const packageNames = getAllPackageNames();

    // Make sure we have at least some packages
    if (!packageNames.length) {
      console.warn('No packages found in the repository');
      return [];
    }

    console.log(`Found ${packageNames.length} packages in the repository`);

    // Write the package names to a static file as JSON
    const filePath = path.resolve(__dirname, PACKAGE_NAMES_FILE_PATH);

    // Make sure the directory exists
    const dirPath = path.dirname(filePath);

    if (!fse.existsSync(dirPath)) {
      fse.mkdirSync(dirPath, { recursive: true });
    }


    const packageNamesFileContents = `// This file is auto-generated by the writeAllPackageNames script
// Do not edit this file directly

export const ALL_PACKAGES = ${JSON.stringify(packageNames, null, 2)};
`
    // Write the file
    fse.writeFileSync(
      filePath,
      packageNamesFileContents
    );

    console.log(`${packageNames.length} package names written to ${PACKAGE_NAMES_FILE_PATH}`);

    return packageNames;
  } catch (error) {
    console.error('Error writing package names to static file:', error);
    return [];
  }
}