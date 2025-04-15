/* eslint-disable no-console */
import uniq from 'lodash/uniq';

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
 * Returns a list of packages to install based on the provided options.
 * If specific packages are requested, those will be used,
 * Otherwise, we filter packages based on the provided flags.
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

  const scopeFilters: Record<string, boolean> = {
    '@leafygreen-ui/': core ?? false,
    '@lg-charts/': charts ?? false,
    '@lg-chat/': chat ?? false,
  };
  const hasScopeFilters = Object.values(scopeFilters).some(Boolean);
  const hasFilterFlags = hasScopeFilters || essentials || basic;

  const packagesToInstall: Array<string> = [];

  // If any filter flags are set, we need to filter the packages based on the provided flags
  // otherwise, we install all packages
  if (hasFilterFlags) {
    verbose && console.log('Filtering packages based on flags');

    // Filter by specific package sets based on flags
    if (essentials) {
      packagesToInstall.concat(ESSENTIAL_PACKAGES);
      verbose && console.log('Installing essential packages');
    }

    if (basic) {
      packagesToInstall.concat(BASIC_PACKAGES);
      verbose && console.log('Installing basic packages');
    }

    if (hasScopeFilters) {
      // Filter packages based on any scope flags
      const scopedPackages = availablePackages.filter(pkg => {
        for (const [scope, include] of Object.entries(scopeFilters)) {
          if (include && pkg.startsWith(scope)) {
            return true;
          }
        }

        return false;
      });
      packagesToInstall.concat(scopedPackages);

      verbose &&
        console.log(
          `Filtered to ${scopedPackages.length} packages based on scope flags`,
        );
    }
  } else {
    // If no specific flags are set, install all packages
    packagesToInstall.concat(availablePackages);
    verbose && console.log('Installing all packages');
  }

  // Remove any duplicates and add @latest tag
  return uniq(packagesToInstall).map(pkg => `${pkg}@latest`);
}
