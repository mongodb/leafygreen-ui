/* eslint-disable no-console */

import { ALL_PACKAGES } from './ALL_PACKAGES';
import { getPackagesToInstall } from './getPackagesToInstall';

// Mock console.log to reduce noise in tests
console.log = jest.fn();

describe('getPackagesToInstall', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return packages matching explicit package names', () => {
    const result = getPackagesToInstall(['button', 'modal'], {});

    expect(result).toEqual([
      '@leafygreen-ui/button@latest',
      '@leafygreen-ui/modal@latest',
    ]);
  });

  test('should return essential packages when essentials option is true', () => {
    const result = getPackagesToInstall([], { essentials: true });

    expect(result).toEqual([
      '@leafygreen-ui/leafygreen-provider@latest',
      '@leafygreen-ui/emotion@latest',
      '@leafygreen-ui/lib@latest',
    ]);
  });

  test('should return basic packages when basic option is true', () => {
    const result = getPackagesToInstall([], { basic: true });

    // Basic packages include essentials plus common components
    expect(result).toEqual([
      '@leafygreen-ui/leafygreen-provider@latest',
      '@leafygreen-ui/emotion@latest',
      '@leafygreen-ui/lib@latest',
      '@leafygreen-ui/banner@latest',
      '@leafygreen-ui/button@latest',
      '@leafygreen-ui/card@latest',
      '@leafygreen-ui/icon@latest',
      '@leafygreen-ui/icon-button@latest',
      '@leafygreen-ui/modal@latest',
      '@leafygreen-ui/tokens@latest',
      '@leafygreen-ui/typography@latest',
    ]);
  });

  test('should prioritize basic over essentials when both are true', () => {
    const result = getPackagesToInstall([], { basic: true, essentials: true });

    // Should return basic packages (which include essentials)
    expect(result).toEqual([
      '@leafygreen-ui/leafygreen-provider@latest',
      '@leafygreen-ui/emotion@latest',
      '@leafygreen-ui/lib@latest',
      '@leafygreen-ui/banner@latest',
      '@leafygreen-ui/button@latest',
      '@leafygreen-ui/card@latest',
      '@leafygreen-ui/icon@latest',
      '@leafygreen-ui/icon-button@latest',
      '@leafygreen-ui/modal@latest',
      '@leafygreen-ui/tokens@latest',
      '@leafygreen-ui/typography@latest',
    ]);
  });

  test('should return core packages when core option is true', () => {
    const result = getPackagesToInstall([], { core: true });

    expect(result).toEqual(
      ALL_PACKAGES.filter(pkg => pkg.startsWith('@leafygreen-ui')).map(
        pkg => `${pkg}@latest`,
      ),
    );
  });

  test('should return charts packages when charts option is true', () => {
    const result = getPackagesToInstall([], { charts: true });

    expect(result).toEqual(
      ALL_PACKAGES.filter(pkg => pkg.startsWith('@lg-charts')).map(
        pkg => `${pkg}@latest`,
      ),
    );
  });

  test('should return chat packages when chat option is true', () => {
    const result = getPackagesToInstall([], { chat: true });

    expect(result).toEqual(
      ALL_PACKAGES.filter(pkg => pkg.startsWith('@lg-chat')).map(
        pkg => `${pkg}@latest`,
      ),
    );
  });

  test('should return combined packages when multiple scope options are true', () => {
    const result = getPackagesToInstall([], {
      core: true,
      charts: true,
    });

    expect(result).toEqual(
      ALL_PACKAGES.filter(
        pkg => pkg.startsWith('@leafygreen-ui') || pkg.startsWith('@lg-charts'),
      ).map(pkg => `${pkg}@latest`),
    );
  });

  test('should return all packages when no options are specified', () => {
    const result = getPackagesToInstall([], {});

    expect(result).toEqual(ALL_PACKAGES.map(pkg => `${pkg}@latest`));
  });

  test('should log additional information when verbose option is true', () => {
    getPackagesToInstall([], { verbose: true });

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('packages in static file'),
    );
  });
});
