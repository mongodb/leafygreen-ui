/* eslint-disable no-console */
import { ALL_PACKAGES } from './ALL_PACKAGES';
import type { InstallCommandOptions } from './types';

// Essential packages that provide core functionality
const ESSENTIAL_PACKAGES = [
  '@leafygreen-ui/leafygreen-provider',
  '@leafygreen-ui/emotion',
  '@leafygreen-ui/lib',
];

// Basic packages that include essentials plus commonly used components
const BASIC_PACKAGES = [
  ...ESSENTIAL_PACKAGES,
  '@leafygreen-ui/banner',
  '@leafygreen-ui/button',
  '@leafygreen-ui/card',
  '@leafygreen-ui/icon',
  '@leafygreen-ui/icon-button',
  '@leafygreen-ui/modal',
  '@leafygreen-ui/tokens',
  '@leafygreen-ui/typography',
];

/**
 * Read package names from the static file
 * Falls back to fetching from NPM if the file doesn't exist
 */
export function getPackagesToInstall(
  explicitPackages: Array<string>,
  options: InstallCommandOptions,
): Array<string> {
  const { verbose, essentials, basic, core, charts, chat } = options;

  const availablePackages = ALL_PACKAGES;
  verbose &&
    console.log(`Found ${availablePackages.length} packages in static file`);

  // If specific packages are requested, use those
  if (explicitPackages.length > 0) {
    return availablePackages
      .filter(fullName => {
        const pkgName = fullName.split('/')[1]; // Get name without scope
        return explicitPackages.includes(pkgName);
      })
      .map(pkg => `${pkg}@latest`);
  }

  // Handle flag options to filter packages
  let packagesToInstall: Array<string> = [];

  // Filter by specific package sets based on flags
  if (basic) {
    packagesToInstall = BASIC_PACKAGES;
    verbose && console.log('Installing basic packages');
  } else if (essentials) {
    packagesToInstall = ESSENTIAL_PACKAGES;
    verbose && console.log('Installing essential packages');
  } else {
    // Handle scope-based filtering
    const scopeFilters: Record<string, boolean> = {
      '@leafygreen-ui/': core ?? false,
      '@lg-charts/': charts ?? false,
      '@lg-chat/': chat ?? false,
    };

    // If any scope filter is true, apply filtering
    const hasScopeFilters = Object.values(scopeFilters).some(Boolean);

    if (hasScopeFilters) {
      packagesToInstall = availablePackages.filter(pkg => {
        for (const [scope, include] of Object.entries(scopeFilters)) {
          if (include && pkg.startsWith(scope)) {
            return true;
          }
        }

        return false;
      });

      verbose &&
        console.log(
          `Filtered to ${packagesToInstall.length} packages based on scope flags`,
        );
    } else {
      // Default to all packages if no flags are specified
      packagesToInstall = availablePackages;
    }
  }

  return packagesToInstall.map(pkg => `${pkg}@latest`);
}
