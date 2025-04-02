/* eslint-disable jest/no-disabled-tests */
import child_process, { ChildProcess } from 'child_process';

import { runESLint } from './eslint';
import { npmPkgJsonLint } from './npmPkgJsonLint';
import { runPrettier } from './prettier';
import { lint } from '.';

const spawnSpy = jest.spyOn(child_process, 'spawn');
spawnSpy.mockImplementation((..._args) => ({} as ChildProcess));

describe.skip('tools/lint', () => {
  const defaultArgs = {
    fix: false,
    prettierOnly: false,
    eslintOnly: false,
    pkgJsonOnly: false,
    verbose: false,
  };

  afterEach(() => {
    spawnSpy.mockClear();
  });

  describe.skip('lint', () => {
    beforeEach(() => {
      jest.mock('./eslint');
      jest.mock('./prettier');
      jest.mock('./npmPkgJsonLint');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('runs with no options', () => {
      lint(defaultArgs);

      expect(runESLint).toHaveBeenCalled();
      expect(runPrettier).toHaveBeenCalled();
      expect(npmPkgJsonLint).toHaveBeenCalled();
    });

    test('runs with --eslintOnly flag', () => {
      lint({ ...defaultArgs, eslintOnly: true });
      expect(runESLint).toHaveBeenCalled();
      expect(runPrettier).not.toHaveBeenCalled();
      expect(npmPkgJsonLint).not.toHaveBeenCalled();
    });

    test('runs with --prettierOnly flag', () => {
      lint({ ...defaultArgs, prettierOnly: true });
      expect(runESLint).not.toHaveBeenCalled();
      expect(runPrettier).toHaveBeenCalled();
      expect(npmPkgJsonLint).not.toHaveBeenCalled();
    });

    test('runs with --pkgJsonOnly flag', () => {
      lint({ ...defaultArgs, pkgJsonOnly: true });
      expect(runESLint).not.toHaveBeenCalled();
      expect(runPrettier).not.toHaveBeenCalled();
      expect(npmPkgJsonLint).toHaveBeenCalled();
    });
  });
});
