import child_process, { ChildProcess } from 'child_process';
import path from 'path';

import { buildPackage } from './build-package';

const spawnSpy = jest.spyOn(child_process, 'spawn');
spawnSpy.mockImplementation((...args) => ({} as ChildProcess));

describe('tools/build/build-package', () => {
  afterEach(() => {
    spawnSpy.mockClear();
  });

  test('runs with no options', () => {
    const defaultRollupConfigPath = path.join(
      __dirname, // __dirname is `dist`
      '../config/rollup.config.mjs',
    );

    buildPackage({});

    expect(spawnSpy).toHaveBeenCalledWith(
      'rollup',
      expect.arrayContaining(['--config', defaultRollupConfigPath]),
      expect.objectContaining({
        stdio: 'inherit',
      }),
    );
  });
});
