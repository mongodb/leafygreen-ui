import fs from 'fs';
import path from 'path';
const rootDir = process.cwd();

export const getAllPackageNames = () =>
  fs.readdirSync(path.join(rootDir, 'packages/'));
