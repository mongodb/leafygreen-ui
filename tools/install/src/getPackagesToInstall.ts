import type {InstallCommandOptions} from './types'
import {ALL_PACKAGES} from './ALL_PACKAGES'


/**
 * Read package names from the static file
 * Falls back to fetching from NPM if the file doesn't exist
 */
export function getPackagesToInstall(
  packages: Array<string>,
  options: InstallCommandOptions
): Array<string> {
  const { verbose } = options;

  const availablePackages = ALL_PACKAGES;
  verbose && console.log(`Found ${availablePackages.length} packages in static file`);

  // Filter packages if specific ones were requested
  const packagesToInstall = packages.length
    ? availablePackages.filter(fullName => {
        const pkgName = fullName.split('/')[1]; // Get name without scope
        return packages.includes(pkgName);
      })
    : availablePackages;

  return packagesToInstall.map(pkg => `${pkg}@latest`);
}
