import {
  isDependencyOnlyUsedInTestFile,
  isDependencyUsedInSourceFile,
  sortDependenciesByUsage,
} from '.';

/** */
describe('tools/validate/utils', () => {
  /** */
  describe('isDependencyUsedInSourceFile', () => {
    test('is used in source file', () => {
      expect(
        isDependencyUsedInSourceFile('@leafygreen-ui/lib', {
          '@leafygreen-ui/lib': ['sourceFile.tsx', 'test.spec.tsx'],
        }),
      ).toBeTruthy();
    });

    test('is not used in source file', () => {
      expect(
        isDependencyUsedInSourceFile('@leafygreen-ui/button', {
          '@leafygreen-ui/button': ['tests.spec.tsx'],
        }),
      ).toBeFalsy();
    });
  });

  /** */
  describe('isDependencyOnlyUsedInTestFile', () => {
    test('is used in source file', () => {
      expect(
        isDependencyOnlyUsedInTestFile('@leafygreen-ui/lib', {
          '@leafygreen-ui/lib': ['sourceFile.tsx', 'test.spec.tsx'],
        }),
      ).toBeFalsy();
    });

    test('is not used in source file', () => {
      expect(
        isDependencyOnlyUsedInTestFile('@leafygreen-ui/button', {
          '@leafygreen-ui/button': ['tests.spec.tsx'],
        }),
      ).toBeTruthy();
    });
  });

  /** */
  describe('sortDependenciesByUsage', () => {
    const depsRecord = {
      '@leafygreen-ui/lib': ['someFile.ts'],
      '@leafygreen-ui/palette': ['otherFile.tsx', 'test.spec.ts'],
      '@leafygreen-ui/typography': ['test.spec.ts'],
      '@leafygreen-ui/tokens': ['component.stories.tsx'],
    };
    const pkgName = 'test-package';

    test('', () => {
      const { dependencies, devDependencies } = sortDependenciesByUsage(
        depsRecord,
        pkgName,
      );

      expect(dependencies).toEqual(
        expect.arrayContaining([
          '@leafygreen-ui/lib',
          '@leafygreen-ui/palette',
        ]),
      );

      expect(devDependencies).toEqual(
        expect.arrayContaining([
          '@leafygreen-ui/typography',
          '@leafygreen-ui/tokens',
        ]),
      );
    });
  });
});
