/* eslint-disable no-console */
import { readFileSync, writeFile } from 'fs';
import { join } from 'path';

import { getAllPackageNames } from './utils/getAllPackageNames';

// Get the list of all packages
const packages = getAllPackageNames();

// Loop through all packages
for (const pkg of packages) {
  console.log(pkg);

  const pkgJsonFilePath = join(__dirname, '../packages', pkg, 'package.json');

  // Open each package's package.json
  const jsonStr = readFileSync(pkgJsonFilePath, {
    encoding: 'utf-8',
  });
  const pkgJson = JSON.parse(jsonStr);

  // Add a ts build script
  pkgJson.scripts = {
    ...pkgJson.scripts,
    build: '../../node_modules/.bin/rollup --config ../../rollup.config.js',
    tsc: 'tsc --build tsconfig.json',
  };

  // Write the file
  writeFile(pkgJsonFilePath, JSON.stringify(pkgJson, null, 2), () => {
    // noop
  });
}
