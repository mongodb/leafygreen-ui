import child_process, { ChildProcess } from 'child_process';
import path from 'path';

import { eslint } from './eslint';
import { npmPkgJsonLint } from './npmPkgJsonLint';
import { prettier } from './prettier';
import { lint } from '.';

const spawnSpy = jest.spyOn(child_process, 'spawn');
spawnSpy.mockImplementation((...args) => ({} as ChildProcess));

describe('tools/lint', () => {
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
      jest.mock('./eslint');
    });

    test('runs with no options', () => {
      lint(defaultArgs);

      expect(eslint).toHaveBeenCalled();
      expect(prettier).toHaveBeenCalled();
      expect(npmPkgJsonLint).toHaveBeenCalled();
    });

    test('runs with --eslintOnly flag', () => {
      lint({ ...defaultArgs, eslintOnly: true });
      expect(eslint).toHaveBeenCalled();
      expect(prettier).not.toHaveBeenCalled();
      expect(npmPkgJsonLint).not.toHaveBeenCalled();
    });

    test('runs with --prettierOnly flag', () => {
      lint({ ...defaultArgs, prettierOnly: true });
      expect(eslint).not.toHaveBeenCalled();
      expect(prettier).toHaveBeenCalled();
      expect(npmPkgJsonLint).not.toHaveBeenCalled();
    });

    test('runs with --pkgJsonOnly flag', () => {
      lint({ ...defaultArgs, pkgJsonOnly: true });
      expect(eslint).not.toHaveBeenCalled();
      expect(prettier).not.toHaveBeenCalled();
      expect(npmPkgJsonLint).toHaveBeenCalled();
    });
  });

  describe.skip('eslint', () => {
    test('Runs eslint command', () => {
      eslint(defaultArgs);
      const eslintConfigPath = path.resolve(
        __dirname,
        '../config/eslint.config.js',
      );

      expect(spawnSpy).toHaveBeenCalledWith(
        'eslint',
        expect.arrayContaining(['--config', eslintConfigPath]),
      );
    });
  });

  describe.skip('prettier', () => {
    test('Runs prettier command', () => {
      prettier(defaultArgs);
      const prettierConfigPath = path.resolve(
        __dirname,
        '../config/prettier.config.js',
      );

      expect(spawnSpy).toHaveBeenCalledWith(
        'prettier',
        expect.arrayContaining(['--check', '--config', prettierConfigPath]),
      );
    });
  });

  describe.skip('npmPkgJsonLint', () => {
    test('Runs npmPkgJson command', () => {
      npmPkgJsonLint(defaultArgs);
      const npmPkgLintConfigPath = path.resolve(
        __dirname,
        '../config/npmpackagejsonlintrc.config.js',
      );

      expect(spawnSpy).toHaveBeenCalledWith(
        'npmPkgJsonLint',
        expect.arrayContaining([
          process.cwd(),
          '--configFile',
          npmPkgLintConfigPath,
        ]),
      );
    });
  });
});
