import fsx from 'fs-extra';
import path from 'path';

import { linkPackageTo } from './linkPackageTo';
import * as spawnLoggedModule from './spawnLogged';

describe('tools/link/linkPackageTo', () => {
  let spawnLoggedSpy: jest.SpyInstance;

  beforeAll(() => {
    fsx.ensureDirSync('./tmp/app');
    fsx.emptyDirSync('./tmp/app');
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

  test('calls `npm link <package>` from the destination directory', async () => {
    await linkPackageTo(path.resolve('./tmp/app'), {
      scopeName: '@example',
      packageName: 'test-package',
    });

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
