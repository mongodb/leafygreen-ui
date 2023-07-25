import child_process, { ChildProcess } from 'child_process';

import { buildTypescript } from './build-ts';

const spawnSpy = jest.spyOn(child_process, 'spawn');
spawnSpy.mockImplementation((...args) => ({} as ChildProcess));

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
