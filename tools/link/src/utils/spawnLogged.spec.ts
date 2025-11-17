/* eslint-disable no-console */
import chalk from 'chalk';

import { SpawnLogger } from './spawnLogged';

describe('tools/link/utils/spawnLogged', () => {
  let originalConsoleLog: typeof console.log;
  let originalConsoleError: typeof console.error;
  let logSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    originalConsoleLog = console.log;
    originalConsoleError = console.error;
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  test('executes a successful command and logs output', async () => {
    const spawnLogger = new SpawnLogger();

    await expect(
      spawnLogger.spawn('echo', ['hi!'], {
        name: 'me',
        cwd: process.cwd(),
        verbose: false,
      }),
    ).resolves.toBeUndefined();

    expect(logSpy).toHaveBeenCalledTimes(2);

    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      '\n' +
        `${chalk.cyan('[me]')} ${chalk.dim('→')} ${chalk.dim(process.cwd())}` +
        '\n' +
        `${chalk.cyan('[me]')} ${chalk.cyan('$')} ${chalk.bold('echo hi!')}` +
        '\n',
    );

    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      `${chalk.cyan('[me]')} ${chalk.dim('→')} ${chalk.dim(
        'finished successfully',
      )}` + '\n',
    );
  });

  test('executes a successful command with verbose output', async () => {
    const spawnLogger = new SpawnLogger();

    await expect(
      spawnLogger.spawn('echo', ['hi!'], {
        name: 'me',
        cwd: process.cwd(),
        verbose: true,
      }),
    ).resolves.toBeUndefined();

    expect(logSpy).toHaveBeenCalledTimes(3);

    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      '\n' +
        `${chalk.cyan('[me]')} ${chalk.dim('→')} ${chalk.dim(process.cwd())}` +
        '\n' +
        `${chalk.cyan('[me]')} ${chalk.cyan('$')} ${chalk.bold('echo hi!')}` +
        '\n',
    );

    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      `${chalk.cyan('[me]')} ${chalk.dim('hi!')}`,
    );

    expect(logSpy).toHaveBeenNthCalledWith(
      3,
      `${chalk.cyan('[me]')} ${chalk.dim('→')} ${chalk.dim(
        'finished successfully',
      )}` + '\n',
    );
  });

  test('executes a failing command and throws error', async () => {
    const spawnLogger = new SpawnLogger();

    await expect(
      spawnLogger.spawn('sh', ['-c', 'exit 1'], {
        name: 'you',
        cwd: process.cwd(),
        verbose: false,
      }),
    ).rejects.toThrow('Command failed with exit code 1');

    // Should log the command being executed
    expect(logSpy).toHaveBeenCalledTimes(2);

    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      '\n' +
        `${chalk.cyan('[you]')} ${chalk.dim('→')} ${chalk.dim(process.cwd())}` +
        '\n' +
        `${chalk.cyan('[you]')} ${chalk.cyan('$')} ${chalk.bold(
          'sh -c exit 1',
        )}` +
        '\n',
    );

    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      `${chalk.cyan('[you]')} ${chalk.dim('→')} ${chalk.red(
        'finished with exit code 1',
      )}\n`,
    );
  });

  test('executes a failing command with verbose output', async () => {
    const spawnLogger = new SpawnLogger();

    await expect(
      spawnLogger.spawn('sh', ['-c', 'echo hi >&2 && exit 10'], {
        name: 'you',
        cwd: process.cwd(),
        verbose: true,
      }),
    ).rejects.toThrow('Command failed with exit code 10');

    // Should log the command being executed
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(errorSpy).toHaveBeenCalledTimes(1);

    expect(errorSpy).toHaveBeenNthCalledWith(
      1,
      `${chalk.cyan('[you]')} ${chalk.reset('hi')}`,
    );

    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      `${chalk.cyan('[you]')} ${chalk.dim('→')} ${chalk.red(
        'finished with exit code 10',
      )}\n`,
    );
  });

  test('handles environment variables', async () => {
    const spawnLogger = new SpawnLogger();

    await expect(
      spawnLogger.spawn('sh', ['-c', 'echo $TEST_VAR'], {
        name: 'env-test',
        cwd: process.cwd(),
        env: { TEST_VAR: 'test-value', PATH: process.env.PATH },
        verbose: true,
      }),
    ).resolves.toBeUndefined();

    expect(logSpy).toHaveBeenCalledTimes(3);

    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      `${chalk.cyan('[env-test]')} ${chalk.dim('test-value')}`,
    );
  });
});
