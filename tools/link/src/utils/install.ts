import { getPackageManager, SupportedPackageManager } from '@lg-tools/meta';
import fsx from 'fs-extra';

import { spawnLogged } from './spawnLogged';

export async function installPackages(
  path: string,
  options?: {
    packageManager?: SupportedPackageManager;
    verbose?: boolean;
  },
): Promise<void> {
  if (fsx.existsSync(path)) {
    const pkgMgr = options?.packageManager ?? getPackageManager(path);

    try {
      await spawnLogged(pkgMgr, ['install'], {
        name: 'install',
        cwd: path,
        verbose: options?.verbose,
      });
    } catch (err) {
      throw new Error(`Error installing packages\n` + err);
    }
  } else {
    throw new Error(`Path ${path} does not exist`);
  }
}
