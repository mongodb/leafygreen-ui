import { formatDependencyLine } from './formatDependencyLine';
import type { AuditReport } from './types';

/**
 * Generates a markdown report from the audit results
 */
export function generateReport(report: AuditReport): string {
  const lines: Array<string> = [
    '# LeafyGreen Dependencies Audit Report',
    '',
    `**Repository:** ${report.repoPath}`,
    `**Generated:** ${report.timestamp}`,
    '',
    '## Summary',
    '',
    `- **Total LeafyGreen packages:** ${report.totalPackages}`,
    `- **Outdated packages:** ${report.outdatedPackages}`,
    '',
    '## Dependencies',
    '',
    '| Package | Installed | Latest | Status |',
    '|---------|-----------|--------|--------|',
    ...report.dependencies
      .sort((a, b) => {
        // Sort by status (most outdated first), then by name
        if (a.majorVersionsBehind !== b.majorVersionsBehind) {
          return b.majorVersionsBehind - a.majorVersionsBehind;
        }

        if (a.minorVersionsBehind !== b.minorVersionsBehind) {
          return b.minorVersionsBehind - a.minorVersionsBehind;
        }

        return a.name.localeCompare(b.name);
      })
      .map(formatDependencyLine),
    '',
  ];

  return lines.join('\n');
}
