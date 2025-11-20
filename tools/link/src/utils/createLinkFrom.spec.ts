import fsx from 'fs-extra';
import path from 'path';

import { createLinkFrom } from './createLinkFrom';
import * as spawnLoggedModule from './spawnLogged';

describe('tools/link/createLinkFrom', () => {
  let spawnLoggedSpy: jest.SpyInstance;

  beforeAll(() => {
    fsx.emptyDirSync('./tmp');
    fsx.rmdirSync('./tmp/');
    fsx.mkdirSync('./tmp/');
    fsx.mkdirSync('./tmp/scope');
    fsx.mkdirSync('./tmp/scope/test-package');
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
    fsx.removeSync('./tmp/');
  });

  test('calls `npm link` command from package directory', async () => {
    await createLinkFrom(path.resolve('./tmp/'), {
      scopeName: '@example',
      scopePath: 'scope',
      packageName: 'test-package',
    });

    expect(spawnLoggedSpy).toHaveBeenCalledWith(
      'npm',
      ['link'],
      expect.objectContaining({
        name: 'link_src:test-package',
        cwd: expect.stringContaining('tmp/scope/test-package'),
      }),
    );
  });
});
