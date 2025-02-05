import fsx from 'fs-extra';

import { getPackageName } from './getPackageName';

describe('tools/meta/getPackageName', () => {
  beforeAll(() => {
    fsx.mkdirSync('./tmp/');
  });
  beforeEach(() => {
    fsx.writeJSONSync('./tmp/package.json', {
      lg: {
        scopes: {
          '@lg-test': 'test/',
        },
      },
    });
    jest.spyOn(process, 'cwd').mockReturnValue('./tmp');
  });
  afterEach(() => {
    fsx.emptyDirSync('./tmp');
    jest.clearAllMocks();
  });
  afterAll(() => {
    fsx.rmdirSync('./tmp/');
  });

  test('returns undefined if the directory does not exist', () => {
    const packageName = getPackageName('non-existent-dir');
    expect(packageName).toBeUndefined();
  });

  test('returns the package name if the directory exists', () => {
    fsx.mkdirSync('./tmp/test');
    fsx.mkdirSync('./tmp/test/test-package');
    const packageName = getPackageName('./tmp/test/test-package');
    expect(packageName).toBe('@lg-test/test-package');
  });
});
