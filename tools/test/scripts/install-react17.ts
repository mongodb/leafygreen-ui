import { getRootPackageJson, isValidJSON } from '@lg-tools/meta';
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

const r17packages = JSON.parse(r17packagesString);

// Add pnpm.overrides
pkgJson.pnpm.overrides = {
  ...pkgJson.pnpm.overrides,
  ...r17packages.pnpm.overrides,
};

const pkgJsonPath = path.resolve(rootDir, 'package.json');
fse.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

// Add and install dependencies
const packagesToAdd = Object.entries(r17packages.dependencies).map(
  ([pkg, version]) => `${pkg}@${version}`,
);

spawnSync(
  'pnpm',
  ['add', '--save-dev', '--ignore-workspace-root-check', ...packagesToAdd],
  {
    stdio: 'inherit',
  },
);

spawnSync('pnpm', ['install']);
