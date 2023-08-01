import fse from 'fs-extra';
import path from 'path';
const rootDir = process.cwd();

export const getAllPackageNames = () =>
  fse.readdirSync(path.join(rootDir, 'packages/'));
