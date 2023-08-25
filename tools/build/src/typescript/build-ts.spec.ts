import xSpawn from 'cross-spawn';

import { buildTypescript } from './build-ts';
type SpawnType = ReturnType<typeof xSpawn.spawn>;
const onCb = (_e: string) => {};

const spawnSpy = jest.spyOn(xSpawn, 'spawn');
spawnSpy.mockImplementation(
  (..._args) => ({ on: onCb } as unknown as SpawnType),
);

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
