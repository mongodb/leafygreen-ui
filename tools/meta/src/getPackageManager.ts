import fse from 'fs-extra';

export type SupportedPackageManager = `npm` | `yarn` | `pnpm`;

/** Reads the lock file to determine which package manager to use */
export function getPackageManager(
  appPath: string,
  defaultPackageManager: SupportedPackageManager = 'npm',
): SupportedPackageManager {
  if (fse.existsSync(`${appPath}/yarn.lock`)) {
    return 'yarn';
  } else if (fse.existsSync(`${appPath}/pnpm-lock.yaml`)) {
    return 'pnpm';
  } else if (fse.existsSync(`${appPath}/package-lock.json`)) {
    return 'npm';
  }

  return defaultPackageManager;
}
