import fse from 'fs-extra';
import path from 'path';

export function getRootPackageJson(): Record<string, any> | undefined {
  const rootDir = process.cwd();
  const pkgJsonPath = path.resolve(rootDir, 'package.json');
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
    return false;
  }
}
