/* eslint-disable no-console */
import { getPackageJson } from '@lg-tools/meta';
import fse from 'fs-extra';
import path from 'path';

export function getExpectedJestVersion(react17: boolean): string {
  if (react17) {
    /** Verify version */
    const r17packagesFile = path.resolve(
      __dirname,
      '../config/react17/r17-packages.json',
    );
    const r17packagesString = fse.readFileSync(r17packagesFile, 'utf-8');
    const r17packages = JSON.parse(r17packagesString);
    return r17packages.dependencies['jest'];
  } else {
    const pkgJson = getPackageJson(__dirname);
    return pkgJson?.dependencies['jest'];
  }
}
