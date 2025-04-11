import { getRepositoryRoot } from '../getRepositoryRoot';
import fse from 'fs-extra';
import path from 'path';

export function getRootPackageJson(): Record<string, any> | undefined {
  const gitRoot = getRepositoryRoot();
  const pkgJsonPath = path.resolve(gitRoot, 'package.json');
  const pkgJsonStr = fse.readFileSync(pkgJsonPath, 'utf-8');

  if (isValidJSON(pkgJsonStr)) {
    return JSON.parse(pkgJsonStr);
  }
}

export function isValidJSON(str?: string): boolean {
  if (!str) return false;

  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
