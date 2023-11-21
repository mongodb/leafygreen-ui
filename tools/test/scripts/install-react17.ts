import { isValidJSON } from '@lg-tools/meta';
import { sync as spawnSync } from 'cross-spawn';
import fse from 'fs-extra';
import path from 'path';

const r17packagesFile = path.resolve(
  __dirname,
  '../config/react17/r17-packages.json',
);

const r17packagesString = fse.readFileSync(r17packagesFile, 'utf-8');

if (isValidJSON(r17packagesString)) {
  const r17packages = JSON.parse(r17packagesString);
  const dependencies = r17packages.dependencies;

  const installString = Object.entries(dependencies)
    .map(([pkg, version]) => `${pkg}@${version}`)
    .join(' ');

  spawnSync('yarn', ['add', '-WD', installString], {
    stdio: 'inherit',
  });
}
