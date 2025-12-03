/* eslint-disable no-console */
import { getPackageJson } from '@lg-tools/meta';
import * as fs from 'fs';
import * as path from 'path';

import { compareVersions } from './utils/compareVersions';
import { extractLeafyGreenDeps } from './utils/extractLeafyGreenDeps';
import { fetchLatestVersion } from './utils/fetchLatestVersion';
import { generateReport } from './utils/generateReport';
import type { AuditOptions, AuditReport, DependencyInfo } from './utils/types';

export type { AuditOptions, AuditReport, DependencyInfo } from './utils/types';

/**
 * Audits a repository for LeafyGreen dependencies and compares them against the latest npm versions.
 * Generates a report file listing all installed LeafyGreen dependencies and how far behind they are.
 *
 * @param options - Audit options
 * @returns The audit report
 */
export async function audit(options: AuditOptions = {}): Promise<AuditReport> {
  const {
    repoPath = process.cwd(),
    outputFileName = 'leafygreen-audit-report.md',
    writeFile = true,
  } = options;

  const packageJson = getPackageJson(repoPath);

  if (!packageJson) {
    throw new Error(`No package.json found at ${repoPath}`);
  }

  // Extract LeafyGreen dependencies
  const lgDeps = extractLeafyGreenDeps(packageJson);

  if (lgDeps.length === 0) {
    console.log('No LeafyGreen dependencies found in package.json');

    const emptyReport: AuditReport = {
      repoPath,
      timestamp: new Date().toISOString(),
      totalPackages: 0,
      outdatedPackages: 0,
      dependencies: [],
    };

    if (writeFile) {
      const reportPath = path.join(repoPath, outputFileName);
      fs.writeFileSync(reportPath, generateReport(emptyReport), 'utf-8');
      console.log(`Report written to ${reportPath}`);
    }

    return emptyReport;
  }

  console.log(
    `Found ${lgDeps.length} LeafyGreen dependencies. Checking npm versions...`,
  );

  // Fetch latest versions for all dependencies in parallel
  const dependencyInfo: Array<DependencyInfo> = await Promise.all(
    lgDeps.map(async dep => {
      const latestVersion = await fetchLatestVersion(dep.name);

      if (latestVersion) {
        const comparison = compareVersions(dep.version, latestVersion);
        return {
          name: dep.name,
          installedVersion: dep.version,
          latestVersion,
          majorVersionsBehind: comparison.majorsBehind,
          minorVersionsBehind: comparison.minorsBehind,
          patchVersionsBehind: comparison.patchesBehind,
        };
      }

      // If we couldn't fetch the latest version, still include it with unknown status
      return {
        name: dep.name,
        installedVersion: dep.version,
        latestVersion: 'unknown',
        majorVersionsBehind: 0,
        minorVersionsBehind: 0,
        patchVersionsBehind: 0,
      };
    }),
  );

  const outdatedPackages = dependencyInfo.filter(
    d =>
      d.majorVersionsBehind > 0 ||
      d.minorVersionsBehind > 0 ||
      d.patchVersionsBehind > 0,
  ).length;

  const report: AuditReport = {
    repoPath,
    timestamp: new Date().toISOString(),
    totalPackages: dependencyInfo.length,
    outdatedPackages,
    dependencies: dependencyInfo,
  };

  if (writeFile) {
    const reportPath = path.join(repoPath, outputFileName);
    const reportContent = generateReport(report);
    fs.writeFileSync(reportPath, reportContent, 'utf-8');
    console.log(`Report written to ${reportPath}`);
  }

  return report;
}
