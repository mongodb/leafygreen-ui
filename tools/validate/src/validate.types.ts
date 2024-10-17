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
  missingDependencies: Array<string>;
  missingDevDependencies: Array<string>;
  unusedDependencies: Array<string>;
  unusedDevDependencies: Array<string>;
  listedDevButUsedAsDependency: Array<string>;
  listedButOnlyUsedAsDev: Array<string>;
  isMissingPeers: boolean;
}
