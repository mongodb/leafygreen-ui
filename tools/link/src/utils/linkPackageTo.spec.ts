import { ChildProcess } from 'child_process';
import xSpawn from 'cross-spawn';
import fsx from 'fs-extra';
import path from 'path';

import { linkPackageTo } from './linkPackageTo';
import { MockChildProcess } from './mocks.testutils';

describe('tools/link/linkPackageTo', () => {
  let spawnSpy: jest.SpyInstance<ChildProcess>;

  beforeAll(() => {
    fsx.emptyDirSync('./tmp');
    fsx.rmdirSync('./tmp/');
    fsx.mkdirSync('./tmp/');
    fsx.mkdirSync('./tmp/app');
  });

  beforeEach(() => {
    spawnSpy = jest.spyOn(xSpawn, 'spawn');
    spawnSpy.mockImplementation((..._args) => new MockChildProcess());
  });

  afterEach(() => {
    spawnSpy.mockRestore();
    fsx.emptyDirSync('./tmp');
  });

  afterAll(() => {
    fsx.rmdirSync('./tmp/');
  });

  test('calls `npm link <package>` from the destination directory', () => {
    linkPackageTo(path.resolve('./tmp/app'), {
      scopeName: '@example',
      packageName: 'test-package',
    });

    expect(spawnSpy).toHaveBeenCalledWith(
      'npm',
      ['link', '@example/test-package'],
      expect.objectContaining({
        cwd: expect.stringContaining('tmp/app'),
      }),
    );
  });
});
