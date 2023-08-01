import child_process, { ChildProcess } from 'child_process';
import path from 'path';

import { test as lgTest } from '.';

const spawnSpy = jest.spyOn(child_process, 'spawn');

describe('tools/test', () => {
  const baseArgs = [
    '--config',
    path.resolve(__dirname, '../config/jest.config.js'),
    '--rootDir',
    process.cwd(),
  ];

  const baseEnv = { env: expect.objectContaining({ JEST_ENV: 'client' }) };

  beforeEach(() => {
    spawnSpy.mockImplementation(
      (...args) =>
        ({
          on: (e: string, cb: (...args: Array<any>) => void) => {},
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
      'jest',
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
      'jest',
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
      'jest',
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
      'jest',
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
      'jest',
      expect.arrayContaining([
        './packages/button/src/Button/Button.spec.tsx',
        ...baseArgs,
      ]),
      expect.objectContaining(baseEnv),
    );
  });
});
