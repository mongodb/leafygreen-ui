import child_process, { ChildProcess } from 'child_process';
import { update } from '.';
const spawnSpy = jest.spyOn(child_process, 'spawn');
spawnSpy.mockImplementation((...args) => ({} as ChildProcess));

describe('tools/update', () => {
  test('Runs with no args', () => {
    update();
    expect(spawnSpy).toHaveBeenCalledWith(
      'yarn',
      expect.arrayContaining(['upgrade', '--scope', '@leafygreen-ui']),
    );
  });

  test('Runs with `--latest` flag', () => {
    update([], { latest: true });
    expect(spawnSpy).toHaveBeenCalledWith(
      'yarn',
      expect.arrayContaining([
        'upgrade',
        '--scope',
        '@leafygreen-ui',
        '--latest',
      ]),
    );
  });

  test('Runs with packages list', () => {
    update(['lib', 'tokens']);
    expect(spawnSpy).toHaveBeenCalledWith(
      'yarn',
      expect.arrayContaining([
        'upgrade',
        'lib',
        'tokens',
        '--scope',
        '@leafygreen-ui',
      ]),
    );
  });
});
