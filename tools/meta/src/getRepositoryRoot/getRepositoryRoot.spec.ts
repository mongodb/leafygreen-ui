import { getRepositoryRoot } from './getRepositoryRoot';

describe('tools/meta/getRepositoryRoot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns the repository root path when successful', async () => {
    const result = await getRepositoryRoot();
    const expectedRoot = process.cwd().split('/leafygreen-ui')[0];
    expect(result).toEqual(expect.stringContaining(expectedRoot));
  });
});
