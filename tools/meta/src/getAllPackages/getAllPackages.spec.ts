import fsx from 'fs-extra';

import { getLGConfig } from '../getLGConfig';
import { getRepositoryRoot } from '../getRepositoryRoot';

import { getAllPackages } from './getAllPackages';

jest.mock('../getLGConfig', () => ({
  getLGConfig: jest.fn(),
}));

jest.mock('../getRepositoryRoot', () => ({
  getRepositoryRoot: jest.fn(),
}));

describe('tools/meta/getAllPackages', () => {
  beforeAll(() => {
    fsx.mkdirSync('./tmp/');
  });

  beforeEach(() => {
    jest.spyOn(process, 'cwd').mockReturnValue('./tmp');
    (getRepositoryRoot as jest.Mock).mockReturnValue('./tmp');
    // Mock the return value of getLGConfig
    (getLGConfig as jest.Mock).mockReturnValue({
      scopes: {
        '@lg-test': 'test',
      },
    });
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
    fsx.ensureDirSync('./tmp/test/test-package');
    const allPackages = getAllPackages();
    expect(allPackages).toEqual([expect.stringMatching(/test-package$/)]);
  });

  test('returns an array of test packages in all scopes', () => {
    // Mock the return value of getLGConfig
    (getLGConfig as jest.Mock).mockReturnValue({
      scopes: {
        '@lg-test': 'test/',
        '@lg-mock': 'mock/',
      },
    });

    fsx.ensureDirSync('./tmp/test/test-package');
    fsx.ensureDirSync('./tmp/mock/mock-package');
    const allPackages = getAllPackages();
    expect(allPackages).toHaveLength(2);
  });
});
