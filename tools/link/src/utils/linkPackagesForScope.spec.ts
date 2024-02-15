import { ChildProcess } from 'child_process';
import xSpawn from 'cross-spawn';
import fsx from 'fs-extra';
import path from 'path';

import { linkPackagesForScope } from './linkPackagesForScope';
import { MockChildProcess } from './mocks.testutils';

describe('tools/link/linkPackagesForScope', () => {
  let spawnSpy: jest.SpyInstance<ChildProcess>;

  beforeAll(() => {
    fsx.emptyDirSync('./tmp');
    fsx.rmdirSync('./tmp/');
    fsx.mkdirSync('./tmp/');
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

  test('creates npm links, and consumes links for all packages', async () => {
    fsx.mkdirSync('./tmp/packages');
    fsx.mkdirSync('./tmp/packages/scope');
    fsx.mkdirSync('./tmp/packages/scope/test-package');
    fsx.mkdirSync('./tmp/app');
    fsx.mkdirSync('./tmp/app/node_modules');
    fsx.mkdirSync('./tmp/app/node_modules/@example');
    fsx.mkdirSync('./tmp/app/node_modules/@example/test-package');

    await linkPackagesForScope(
      {
        scopeName: '@example',
        scopePath: 'scope',
      },
      path.resolve('./tmp/packages'),
      path.resolve('./tmp/app'),
    );

    // Creates links
    expect(spawnSpy).toHaveBeenCalledWith(
      'npm',
      ['link'],
      expect.objectContaining({
        cwd: expect.stringContaining('tmp/packages/scope/test-package'),
      }),
    );

    // Consumes links
    expect(spawnSpy).toHaveBeenCalledWith(
      'npm',
      ['link', '@example/test-package'],
      expect.objectContaining({
        cwd: expect.stringContaining('tmp/app'),
      }),
    );
  });
});
