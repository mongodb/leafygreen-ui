import fs from 'fs';
import path from 'path';
const rootDir = process.cwd();

console.log({ rootDir });

export const getAllPackageNames = () =>
  fs.readdirSync(path.join(rootDir, 'packages/'));
