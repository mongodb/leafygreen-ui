import { ChildProcess } from 'child_process';
import xSpawn from 'cross-spawn';
import fsx from 'fs-extra';
import path from 'path';

import { createLinkFrom } from './createLinkFrom';
import { MockChildProcess } from './mocks.testutils';

describe('tools/link/createLinkFrom', () => {
  let spawnSpy: jest.SpyInstance<ChildProcess>;

  beforeAll(() => {
    fsx.emptyDirSync('./tmp');
    fsx.rmdirSync('./tmp/');
    fsx.mkdirSync('./tmp/');
    fsx.mkdirSync('./tmp/scope');
    fsx.mkdirSync('./tmp/scope/test-package');
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

  test('calls `npm link` command from package directory', () => {
    createLinkFrom(path.resolve('./tmp/'), {
      scopeName: '@example',
      scopePath: 'scope',
      packageName: 'test-package',
    });

    expect(spawnSpy).toHaveBeenCalledWith(
      'npm',
      ['link'],
      expect.objectContaining({
        cwd: expect.stringContaining('tmp/scope/test-package'),
      }),
    );
  });
});
