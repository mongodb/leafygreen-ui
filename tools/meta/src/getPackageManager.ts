import fs from 'fs';

/** Reads the lock file to determine which package manager to use */
export function getPackageManager(appPath: string): `npm` | `yarn` {
  if (fs.existsSync(`${appPath}/yarn.lock`)) {
    return 'yarn';
  } else if (fs.existsSync(`${appPath}/package-lock.json`)) {
    return 'npm';
  }

  return 'npm';
}
