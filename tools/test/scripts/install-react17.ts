import { getRootPackageJson, isValidJSON } from '@lg-tools/meta';
import chalk from 'chalk';
import { sync as spawnSync } from 'cross-spawn';
import fse from 'fs-extra';
import path from 'path';
const rootDir = process.cwd();

const pkgJson = getRootPackageJson();
const r17packagesFile = path.resolve(
  __dirname,
  '../config/react17/r17-packages.json',
);

const r17packagesString = fse.readFileSync(r17packagesFile, 'utf-8');

if (!pkgJson) {
  throw new Error(`Could not find root package.json`);
}

if (!isValidJSON(r17packagesString)) {
  throw new Error(`Invalid JSON found in ${r17packagesFile}`);
}

// eslint-disable-next-line no-console
console.log(chalk.bold.blue('Updating package.json with React 17 versions'));

const r17packages = JSON.parse(r17packagesString);

pkgJson.dependencies = {
  ...pkgJson.devDependencies,
  ...r17packages.dependencies,
};
pkgJson.pnpm.overrides = {
  ...pkgJson.pnpm.overrides,
  ...r17packages.pnpm.overrides,
};

const pkgJsonPath = path.resolve(rootDir, 'package.json');
fse.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

// Remove the lock file referencing any _new_ versions of React
// eslint-disable-next-line no-console
console.log(chalk.bold.blue('Removing pnpm-lock.yaml'));
spawnSync('rm', ['-f', 'pnpm-lock.yaml'], {
  stdio: 'inherit',
});

// Clean up the node_modules
// eslint-disable-next-line no-console
console.log(chalk.bold.blue('Cleaning up node_modules'));
spawnSync('pnpm', ['clean:modules'], {
  stdio: 'inherit',
});

// Install the new versions of React
// eslint-disable-next-line no-console
console.log(chalk.bold.blue('Installing new versions of React 17 packages'));
spawnSync('pnpm', ['install'], {
  stdio: 'inherit',
});
