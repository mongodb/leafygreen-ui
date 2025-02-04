import fsx from 'fs-extra';

import { getPackageJson } from './getPackageJson';

describe('tools/meta/getPackageJson', () => {
  beforeAll(() => {
    fsx.mkdirSync('./tmp/');
  });
  beforeEach(() => {
    jest.spyOn(process, 'cwd').mockReturnValue('./tmp');
  });
  afterEach(() => {
    fsx.emptyDirSync('./tmp');
    jest.clearAllMocks();
  });
  afterAll(() => {
    fsx.rmdirSync('./tmp/');
  });

  test('finds the parent package.json by default', () => {
    const packageJson = getPackageJson('./tmp');
    expect(packageJson).toEqual(
      expect.objectContaining({ name: 'leafygreen-ui' }),
    );
  });

  test('returns the package.json data', () => {
    const pkgJson = { name: 'test-package', version: '0.0.0' };
    fsx.writeJSONSync('./tmp/package.json', pkgJson);
    const packageJson = getPackageJson('./tmp');
    expect(packageJson).toEqual(pkgJson);
  });
});
