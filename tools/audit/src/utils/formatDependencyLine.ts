import type { DependencyInfo } from './types';

/**
 * Formats a dependency info object for the report
 */
export function formatDependencyLine(dep: DependencyInfo): string {
  const status =
    dep.majorVersionsBehind > 0
      ? `⚠️  ${dep.majorVersionsBehind} major version(s) behind`
      : dep.minorVersionsBehind > 0
        ? `⚡ ${dep.minorVersionsBehind} minor version(s) behind`
        : dep.patchVersionsBehind > 0
          ? `📦 ${dep.patchVersionsBehind} patch version(s) behind`
          : '✅ Up to date';

  return `| ${dep.name} | ${dep.installedVersion} | ${dep.latestVersion} | ${status} |`;
}

