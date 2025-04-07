import { getPackageJson } from '@lg-tools/meta';
import fsx from 'fs-extra';
import path from 'path';

const packageJson = getPackageJson(__dirname);

if (!packageJson) {
  throw new Error('Failed to get package.json');
}

const version = packageJson.version;

fsx.writeFileSync(
  path.resolve(__dirname, '../src/version.ts'),
  `export const VERSION = '${version}';\n`,
);
