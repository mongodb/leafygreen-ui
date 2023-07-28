import xSpawn from 'cross-spawn';

import { buildTypescript } from './build-ts';
type SpawnType = ReturnType<typeof xSpawn.spawn>;

const spawnSpy = jest.spyOn(xSpawn, 'spawn');
spawnSpy.mockImplementation((...args) => ({} as SpawnType));

describe('tools/build/build-ts', () => {
  test('runs with no options', () => {
    buildTypescript();

    expect(spawnSpy).toHaveBeenCalledWith(
      'tsc',
      expect.arrayContaining(['--build']),
      expect.objectContaining({
        stdio: 'inherit',
      }),
    );
  });
});
