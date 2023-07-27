import fse from 'fs-extra';
/** Reads the lock file to determine which package manager to use */
export function getPackageManager(appPath: string): `npm` | `yarn` {
  if (fse.existsSync(`${appPath}/yarn.lock`)) {
    return 'yarn';
  } else if (fse.existsSync(`${appPath}/package-lock.json`)) {
    return 'npm';
  }

  return 'npm';
}
