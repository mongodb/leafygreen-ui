/* eslint-disable no-console */
import { getPackageManager } from '@lg-tools/meta';
import { spawn } from 'cross-spawn';
import fetch from 'node-fetch';
export interface InstallCommandOptions {
  ignoreWorkspaceRootCheck: boolean;
  verbose: boolean;
}

interface NpmFetchData {
  objects: Array<NpmSearchResult>;
  total: number;
}
interface NpmSearchResult {
  package: {
    name: string;
    scope: string;
    version: string;
    description: string;
    date: string;
    links: {
      npm: string;
      homepage: string;
      repository: string;
      bugs: string;
    };
    publisher: { username: string; email: string };
    maintainers: Array<{
      username: string;
      email: string;
    }>;
  };
  flags?: { unstable?: true; deprecated?: true };
  score: { final: number; detail: any };
  searchScore: number;
}

const lguiNpmUrl =
  'https://registry.npmjs.com/-/v1/search?text=@leafygreen-ui&size=250';

const rootDir = process.cwd();

/**
 * Installs the defined LeafyGreen packages
 */
export const installLeafyGreen = (
  packages: Array<string>,
  { ignoreWorkspaceRootCheck, verbose }: InstallCommandOptions,
) => {
  console.log('Fetching Leafygreen dependencies');

  fetch(lguiNpmUrl)
    .then(data => data.json())
    .then(({ objects, total }: NpmFetchData) => {
      console.log('Installing Leafygreen packages');

      const packagesToInstall = objects
        .filter(pkg => {
          const pkgName = pkg.package.name.replace(
            '@' + pkg.package.scope + '/',
            '',
          );

          return (
            !pkg.flags?.deprecated &&
            (!packages.length || packages.includes(pkgName))
          );
        })
        .map(pkg => `${pkg.package.name}@latest`);

      const pkgMgr = getPackageManager(rootDir);

      verbose && console.log(packagesToInstall);

      spawn(
        pkgMgr,
        [
          pkgMgr === 'yarn' ? 'add' : 'install',
          ...packagesToInstall,
          ignoreWorkspaceRootCheck ? '-W' : '',
        ],
        {
          stdio: 'inherit',
        },
      );
    });
};
