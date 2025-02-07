import fsx from 'fs-extra';

import { getAllPackages } from './getAllPackages';

describe('tools/meta/getAllPackages', () => {
  beforeAll(() => {
    fsx.ensureDirSync('./tmp/');
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

  test('returns an empty array if no packages exist', () => {
    const allPackages = getAllPackages();
    expect(allPackages).toEqual([]);
  });

  test('returns an array of test packages', () => {
    fsx.writeJSONSync('./tmp/package.json', {
      lg: {
        scopes: {
          '@lg-test': 'test/',
        },
      },
    });
    fsx.mkdirSync('./tmp/test');
    fsx.mkdirSync('./tmp/test/test-package');
    const allPackages = getAllPackages();
    expect(allPackages).toEqual([expect.stringMatching(/test-package$/)]);
  });

  test('returns an array of test packages in all scopes', () => {
    fsx.writeJSONSync('./tmp/package.json', {
      lg: {
        scopes: {
          '@lg-test': 'test/',
          '@lg-mock': 'mock/',
        },
      },
    });
    fsx.mkdirSync('./tmp/test');
    fsx.mkdirSync('./tmp/test/test-package');
    fsx.mkdirSync('./tmp/mock');
    fsx.mkdirSync('./tmp/mock/mock-package');
    const allPackages = getAllPackages();
    expect(allPackages).toHaveLength(2);
  });
});
