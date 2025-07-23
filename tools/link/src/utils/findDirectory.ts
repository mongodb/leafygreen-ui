import fse from 'fs-extra';
import { homedir } from 'os';
import path from 'path';

export function findDirectory(
  startDir: string,
  targetDir: string,
): string | undefined {
  const testDir = path.join(startDir, targetDir);

  if (fse.existsSync(testDir) && fse.lstatSync(testDir).isDirectory()) {
    return testDir;
  } else {
    const parentDir = path.join(startDir, '..');

    // If we haven't reached the users home directory, recursively look for the packages directory
    if (parentDir !== homedir()) {
      return findDirectory(path.join(startDir, '..'), targetDir);
    }
  }
}
