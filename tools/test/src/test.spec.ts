import child_process, { ChildProcess } from 'child_process';
import path from 'path';

import { test as lgTest } from '.';

const spawnSpy = jest.spyOn(child_process, 'spawn');

const defaultConfigPath = path.resolve(
  process.cwd(),
  'node_modules/@lg-tools/test/config/jest.config.js',
);

describe('tools/test', () => {
  const baseArgs = ['--config', defaultConfigPath, '--rootDir', process.cwd()];

  const baseEnv = { env: expect.objectContaining({ JEST_ENV: 'client' }) };

  beforeEach(() => {
    spawnSpy.mockImplementation(
      (..._args) =>
        ({
          on: (_e: string, _cb: (..._args: Array<any>) => void) => {},
        } as ChildProcess),
    );
  });

  afterEach(() => {
    spawnSpy.mockReset();
  });

  test('runs basic command', () => {
    lgTest(undefined, {
      watch: false,
      ci: false,
    });
    expect(spawnSpy).toHaveBeenCalledWith(
      expect.stringContaining('jest'),
      expect.arrayContaining(baseArgs),
      expect.objectContaining(baseEnv),
    );
  });

  test('runs with watch flag', () => {
    lgTest(undefined, {
      watch: true,
      ci: false,
    });
    expect(spawnSpy).toHaveBeenCalledWith(
      expect.stringContaining('jest'),
      expect.arrayContaining([...baseArgs, '--watch']),
      expect.objectContaining(baseEnv),
    );
  });

  test('runs in ci mode', () => {
    lgTest(undefined, {
      watch: false,
      ci: true,
    });
    expect(spawnSpy).toHaveBeenCalledWith(
      expect.stringContaining('jest'),
      expect.arrayContaining([
        ...baseArgs,
        '--no-cache',
        '--ci',
        '--runInBand',
        '--reporters=default',
        '--reporters=jest-junit',
      ]),
      expect.objectContaining(baseEnv),
    );
  });

  test('runs for only specific tests', () => {
    lgTest('--testNamePattern=button', {
      watch: false,
      ci: true,
    });
    expect(spawnSpy).toHaveBeenCalledWith(
      expect.stringContaining('jest'),
      expect.arrayContaining([...baseArgs, '--testNamePattern=button']),
      expect.objectContaining(baseEnv),
    );
  });

  test('runs for specific files', () => {
    lgTest('./packages/button/src/Button/Button.spec.tsx', {
      watch: false,
      ci: true,
    });

    expect(spawnSpy).toHaveBeenCalledWith(
      expect.stringContaining('jest'),
      expect.arrayContaining([
        './packages/button/src/Button/Button.spec.tsx',
        ...baseArgs,
      ]),
      expect.objectContaining(baseEnv),
    );
  });
});
