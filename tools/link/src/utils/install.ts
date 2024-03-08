import { getPackageManager } from '@lg-tools/meta';
import { SupportedPackageManager } from '@lg-tools/meta/src/getPackageManager';
import { spawn } from 'cross-spawn';
import fsx from 'fs-extra';

export async function installPackages(
  path: string,
  options?: {
    packageManager?: SupportedPackageManager;
    verbose?: boolean;
  },
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (fsx.existsSync(path)) {
      const pkgMgr = options?.packageManager ?? getPackageManager(path);

      spawn(pkgMgr, ['install'], {
        cwd: path,
        stdio: options?.verbose ? 'inherit' : 'ignore',
      })
        .on('close', resolve)
        .on('error', err => {
          throw new Error(`Error installing packages\n` + err);
        });
    } else {
      console.error(`Path ${path} does not exist`);
      reject();
    }
  });
}
