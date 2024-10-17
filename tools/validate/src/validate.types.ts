import { getPackageJson } from '@lg-tools/meta';
import depcheck from 'depcheck';

export interface ValidateCommandOptions {
  buildsOnly: boolean;
  depsOnly: boolean;
  fix: boolean;
  fixTsconfig: boolean;
  verbose: boolean;
}

export interface DepCheckFunctionProps {
  pkgName: string;
  pkgJson: ReturnType<typeof getPackageJson>;
  importedPackages: depcheck.Results['using'];
}

export interface DependencyIssues {
  /**
   * A record of missing dependencies, and the files they're imported from
   */
  missingDependencies: Record<string, Array<string>>;

  /**
   * A record of missing devDependencies, and the files they're imported from
   */
  missingDevDependencies: Record<string, Array<string>>;

  /**
   * An array of package names that are listed as dependencies,
   * but not imported
   */
  unusedDependencies: Array<string>;

  /**
   * An array of package names that are listed as devDependencies,
   * but not imported
   */
  unusedDevDependencies: Array<string>;

  /**
   * A record of packages that are listed as devDependencies,
   * but are imported from production files
   */
  listedDevButUsedAsDependency: Record<string, Array<string>>;

  /**
   * A record of packages that are listed as dependencies,
   * but are only imported from test files
   */
  listedButOnlyUsedAsDev: Record<string, Array<string>>;
  isMissingPeers: boolean;
}
