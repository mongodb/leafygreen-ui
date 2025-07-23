import { getRootPackageJson } from './getRootPackageJson';

describe('tools/meta/getRootPackageJson', () => {
  test('should return the root package.json', () => {
    expect(getRootPackageJson()).toMatchObject({
      name: 'leafygreen-ui',
      version: '0.0.0',
    });
  });
});
