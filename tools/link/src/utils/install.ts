import { getPackageManager } from '@lg-tools/meta';
import { SupportedPackageManager } from '@lg-tools/meta/src/getPackageManager';
import { spawn } from 'cross-spawn';
import fsx from 'fs-extra';

/**
 * @deprecated use `installPackages` instead
 */
export function yarnInstall(path: string) {
  return new Promise(resolve => {
    spawn('yarn', ['install'], {
      cwd: path,
      stdio: 'ignore',
    })
      .on('close', resolve)
      .on('error', () => {
        throw new Error(`Error installing packages`);
      });
  });
}

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
    }
    reject();
  });
}
