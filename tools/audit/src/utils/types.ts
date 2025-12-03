export interface DependencyInfo {
  name: string;
  installedVersion: string;
  latestVersion: string;
  majorVersionsBehind: number;
  minorVersionsBehind: number;
  patchVersionsBehind: number;
}

export interface AuditReport {
  repoPath: string;
  timestamp: string;
  totalPackages: number;
  outdatedPackages: number;
  dependencies: Array<DependencyInfo>;
}

export interface AuditOptions {
  /** Absolute path to the repo to audit. Defaults to current working directory */
  repoPath?: string;
  /** Name of the output report file. Defaults to 'leafygreen-audit-report.md' */
  outputFileName?: string;
  /** Whether to write the report to a file. Defaults to true */
  writeFile?: boolean;
}
