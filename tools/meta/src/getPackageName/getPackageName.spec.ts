import fsx from 'fs-extra';

import { getLGConfig } from '../getLGConfig';

import { getPackageName } from './getPackageName';

jest.mock('../getLGConfig', () => ({
  getLGConfig: jest.fn(),
}));

// eslint-disable-next-line no-console
console.log = jest.fn();

describe('tools/meta/getPackageName', () => {
  beforeAll(() => {
    fsx.mkdirSync('./tmp/');
    // Mock the getLGConfig function
  });
  beforeEach(() => {
    // Mock the return value of getLGConfig
    (getLGConfig as jest.Mock).mockReturnValue({
      scopes: {
        '@lg-test': 'test',
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
    fsx.ensureDirSync('./tmp/test/test-package');
    const packageName = getPackageName('./tmp/test/test-package');
    expect(packageName).toBe('@lg-test/test-package');
  });
});
