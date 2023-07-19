import child_process, { ChildProcess } from 'child_process';

import { update } from '.';
const spawnSpy = jest.spyOn(child_process, 'spawn');
spawnSpy.mockImplementation((...args) => ({} as ChildProcess));

describe('tools/update', () => {
  const defaultOptions = {
    scope: '@leafygreen-ui',
    latest: false,
  };
  const baseEnv = expect.objectContaining({ stdio: 'inherit' });

  afterEach(() => {
    spawnSpy.mockClear();
  });

  test('Runs with no args', () => {
    update([], defaultOptions);
    expect(spawnSpy).toHaveBeenCalledWith(
      'yarn',
      expect.arrayContaining(['upgrade', '--scope', '@leafygreen-ui']),
      baseEnv,
    );
  });

  test('Runs with `--latest` flag', () => {
    update([], { ...defaultOptions, latest: true });
    expect(spawnSpy).toHaveBeenCalledWith(
      'yarn',
      expect.arrayContaining([
        'upgrade',
        '--scope',
        '@leafygreen-ui',
        '--latest',
      ]),
      baseEnv,
    );
  });

  test('Runs with packages list', () => {
    update(['lib', 'tokens'], defaultOptions);
    expect(spawnSpy).toHaveBeenCalledWith(
      'yarn',
      expect.arrayContaining([
        'upgrade',
        'lib',
        'tokens',
        '--scope',
        '@leafygreen-ui',
      ]),
      baseEnv,
    );
  });
});
