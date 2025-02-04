import fsx from 'fs-extra';

import { getPackageManager } from './getPackageManager';

describe('tools/meta/getPackageManager', () => {
  beforeAll(() => {
    fsx.mkdirSync('./tmp/');
  });

  afterEach(() => {
    fsx.emptyDirSync('./tmp');
  });

  afterAll(() => {
    fsx.rmdirSync('./tmp/');
  });

  test('returns `npm` by default', () => {
    const pkgMgr = getPackageManager('./tmp');
    expect(pkgMgr).toBe('npm');
  });

  test('returns provided default package manager', () => {
    const pkgMgr = getPackageManager('./tmp', 'yarn');
    expect(pkgMgr).toBe('yarn');
  });

  test('returns `npm` when package-lock exists', () => {
    fsx.createFileSync('./tmp/package-lock.json');
    const pkgMgr = getPackageManager('./tmp');
    expect(pkgMgr).toBe('npm');
  });

  test('returns `yarn` when yarn.lock exists', () => {
    fsx.createFileSync('./tmp/yarn.lock');
    const pkgMgr = getPackageManager('./tmp');
    expect(pkgMgr).toBe('yarn');
  });

  test('returns `pnpm` when pnpm-lock exists', () => {
    fsx.createFileSync('./tmp/pnpm-lock.yaml');
    const pkgMgr = getPackageManager('./tmp');
    expect(pkgMgr).toBe('pnpm');
  });
});
