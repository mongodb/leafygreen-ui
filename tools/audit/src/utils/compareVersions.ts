import { parseVersion } from './parseVersion';

/**
 * Compares two semver versions and returns the difference
 */
export function compareVersions(
  installed: string,
  latest: string,
): { majorsBehind: number; minorsBehind: number; patchesBehind: number } {
  const installedParsed = parseVersion(installed);
  const latestParsed = parseVersion(latest);

  if (!installedParsed || !latestParsed) {
    return { majorsBehind: 0, minorsBehind: 0, patchesBehind: 0 };
  }

  const majorsBehind = Math.max(0, latestParsed.major - installedParsed.major);

  // Only count minor versions behind if on same major
  const minorsBehind =
    majorsBehind === 0
      ? Math.max(0, latestParsed.minor - installedParsed.minor)
      : 0;

  // Only count patch versions behind if on same major and minor
  const patchesBehind =
    majorsBehind === 0 && minorsBehind === 0
      ? Math.max(0, latestParsed.patch - installedParsed.patch)
      : 0;

  return { majorsBehind, minorsBehind, patchesBehind };
}

