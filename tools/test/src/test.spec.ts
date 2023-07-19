import { test as lgTest } from '.';
import path from 'path';
import child_process, { ChildProcess } from 'child_process';

const spawnSpy = jest.spyOn(child_process, 'spawn');
spawnSpy.mockImplementation((...args) => ({} as ChildProcess));

describe('tools/test', () => {
  const baseArgs = [
    '--config',
    path.resolve(__dirname, '../config/jest.config.js'),
    '--rootDir',
    process.cwd(),
  ];

  const baseEnv = { env: expect.objectContaining({ JEST_ENV: 'client' }) };

  afterEach(() => {
    spawnSpy.mockReset();
  });

  test('runs basic command', () => {
    lgTest({
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
    lgTest({
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
    lgTest({
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
    lgTest({
      watch: false,
      ci: true,
      testNamePattern: 'button',
    });
    expect(spawnSpy).toHaveBeenCalledWith(
      'jest',
      expect.arrayContaining([...baseArgs, '--testNamePattern=button']),
      expect.objectContaining(baseEnv),
    );
  });
});
