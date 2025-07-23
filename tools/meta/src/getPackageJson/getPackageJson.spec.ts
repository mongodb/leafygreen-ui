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

  // TODO: TBD whether this is the behavior we want, but this is how it's currently implemented
  test('finds the parent package.json by default', () => {
    const packageJson = getPackageJson('./tmp');
    expect(packageJson).toEqual(
      expect.objectContaining({ name: 'leafygreen-ui' }),
    );
  });

  test('returns the local package.json data', () => {
    const pkgJson = { name: 'test-package', version: '0.0.0' };
    fsx.writeJSONSync('./tmp/package.json', pkgJson);
    const packageJson = getPackageJson('./tmp');
    expect(packageJson).toEqual(pkgJson);
  });
});
