import fsx from 'fs-extra';
import path from 'path';

import { linkPackagesForScope } from './linkPackagesForScope';
import * as spawnLoggedModule from './spawnLogged';

describe('tools/link/linkPackagesForScope', () => {
  let spawnLoggedSpy: jest.SpyInstance;

  beforeAll(() => {
    fsx.emptyDirSync('./tmp');
    fsx.rmdirSync('./tmp/');
    fsx.mkdirSync('./tmp/');
  });

  beforeEach(() => {
    spawnLoggedSpy = jest
      .spyOn(spawnLoggedModule, 'spawnLogged')
      .mockResolvedValue(undefined);
  });

  afterEach(() => {
    spawnLoggedSpy.mockRestore();
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

    await linkPackagesForScope({
      scopeName: '@example',
      scopePath: 'scope',
      source: path.resolve('./tmp/packages'),
      destination: path.resolve('./tmp/app'),
    });

    // Creates links
    expect(spawnLoggedSpy).toHaveBeenCalledWith(
      'npm',
      ['link'],
      expect.objectContaining({
        name: 'link_src:test-package',
        cwd: expect.stringContaining('tmp/packages/scope/test-package'),
      }),
    );

    // Consumes links
    expect(spawnLoggedSpy).toHaveBeenCalledWith(
      'npm',
      ['link', '@example/test-package'],
      expect.objectContaining({
        name: 'link_dst:test-package',
        cwd: expect.stringContaining('tmp/app'),
      }),
    );
  });
});
