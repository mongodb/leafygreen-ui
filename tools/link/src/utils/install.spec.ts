import { ChildProcess } from 'child_process';
import xSpawn from 'cross-spawn';
import fsx from 'fs-extra';

import { installPackages } from './install';
import { MockChildProcess } from './mocks.testutils';

describe('tools/link/utils/install', () => {
  let spawnSpy: jest.SpyInstance<ChildProcess>;

  beforeAll(() => {
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

  test('runs `npm install` command', async () => {
    await installPackages('./tmp');
    expect(spawnSpy).toHaveBeenCalledWith(
      'npm',
      ['install'],
      expect.objectContaining({}),
    );
  });

  test('runs install command using local package manager', async () => {
    fsx.createFileSync('./tmp/yarn.lock');
    await installPackages('./tmp');
    expect(spawnSpy).toHaveBeenCalledWith(
      'yarn',
      ['install'],
      expect.objectContaining({}),
    );
  });
});
