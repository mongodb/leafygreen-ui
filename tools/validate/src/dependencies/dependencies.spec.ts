import { validateListedDependencies } from './validateListedDependencies';
import { validateListedDevDependencies } from './validateListedDevDependencies';
import { isMissingProviderPeer } from './validatePeerDependencies';

describe('tools/validate:dependencies', () => {
  const pkgName = 'test-package';

  /** */
  describe('validateListedDependencies', () => {
    test('Returns empty array when all dependencies are OK', () => {
      const pkgJson = {
        dependencies: {
          '@leafygreen-ui/lib': '*',
        },
      };
      const importedPackages = {
        '@leafygreen-ui/lib': ['someFile.tsx'],
      };

      const result = validateListedDependencies({
        pkgName,
        pkgJson,
        importedPackages,
      });

      expect(result).toHaveLength(0);
    });

    test('Returns improperly listed dependencies', () => {
      const pkgJson = {
        dependencies: {
          // Listed as a dependency...
          '@leafygreen-ui/lib': '*',
        },
      };
      const importedPackages = {
        // ...Used as a devDependency
        '@leafygreen-ui/lib': ['test.spec.tsx'],
      };

      const result = validateListedDependencies({
        pkgName,
        pkgJson,
        importedPackages,
      });

      expect(result).toEqual(expect.arrayContaining(['@leafygreen-ui/lib']));
    });
  });

  /** */
  describe('validateListedDevDependencies', () => {
    test('Returns an empty array when devDependencies are OK', () => {
      const pkgJson = {
        devDependencies: {
          '@leafygreen-ui/lib': '*',
        },
      };
      const importedPackages = {
        '@leafygreen-ui/lib': ['test.spec.tsx'],
      };

      const result = validateListedDevDependencies({
        pkgName,
        pkgJson,
        importedPackages,
      });

      expect(result).toHaveLength(0);
    });

    test('Returns improperly listed devDependencies', () => {
      const pkgJson = {
        devDependencies: {
          // Listed as dev...
          '@leafygreen-ui/lib': '*',
        },
      };
      const importedPackages = {
        // but used in a source file
        '@leafygreen-ui/lib': ['sourceFile.tsx'],
      };

      const result = validateListedDevDependencies({
        pkgName,
        pkgJson,
        importedPackages,
      });

      expect(result).toEqual(expect.arrayContaining(['@leafygreen-ui/lib']));
    });
  });

  /** */
  describe('isMissingProviderPeer', () => {
    test('false when provider is listed as a peerDependency', () => {
      expect(
        isMissingProviderPeer({
          pkgName,
          pkgJson: {
            peerDependencies: {
              '@leafygreen-provider': '*',
            },
          },
          importedPackages: {
            '@leafygreen-provider': ['some/file.tsx'],
          },
        }),
      ).toBeFalsy();
    });

    test('false when provider is not imported', () => {
      expect(
        isMissingProviderPeer({
          pkgName,
          pkgJson: {
            peerDependencies: {
              '@leafygreen-provider': '*',
            },
          },
          importedPackages: {},
        }),
      ).toBeFalsy();
    });

    test('true when provider is not listed', () => {
      expect(
        isMissingProviderPeer({
          pkgName,
          pkgJson: {},
          importedPackages: {
            '@leafygreen-provider': ['some/file.tsx'],
          },
        }),
      ).toBeFalsy();
    });

    test('true when provider is improperly listed', () => {
      expect(
        isMissingProviderPeer({
          pkgName,
          pkgJson: {
            dependencies: {
              '@leafygreen-provider': '*',
            },
          },
          importedPackages: {
            '@leafygreen-provider': ['some/file.tsx'],
          },
        }),
      ).toBeFalsy();
    });
  });
});
