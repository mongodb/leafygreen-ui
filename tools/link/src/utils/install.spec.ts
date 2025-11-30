import fsx from 'fs-extra';

import { installPackages } from './install';
import * as spawnLoggedModule from './spawnLogged';

describe('tools/link/utils/install', () => {
  let spawnLoggedSpy: jest.SpyInstance;

  beforeAll(() => {
    fsx.ensureDirSync('./tmp/');
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

  test('runs `npm install` command', async () => {
    await installPackages('./tmp');
    expect(spawnLoggedSpy).toHaveBeenCalledWith(
      'npm',
      ['install'],
      expect.objectContaining({
        cwd: './tmp',
      }),
    );
  });

  test('runs install command using local package manager', async () => {
    fsx.createFileSync('./tmp/pnpm-lock.yaml');
    await installPackages('./tmp');
    expect(spawnLoggedSpy).toHaveBeenCalledWith(
      'pnpm',
      ['install'],
      expect.objectContaining({
        cwd: './tmp',
      }),
    );
  });
});
