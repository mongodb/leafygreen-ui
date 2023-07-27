import xSpawn from 'cross-spawn';
import path from 'path';

import { buildPackage } from './build-package';

type SpawnType = ReturnType<typeof xSpawn.spawn>;

const spawnSpy = jest.spyOn(xSpawn, 'spawn');
spawnSpy.mockImplementation((...args) => ({} as SpawnType));

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
