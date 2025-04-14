/* eslint-disable no-console */
import { getPackageManager } from '@lg-tools/meta';
import { spawn } from 'cross-spawn';

import { getPackagesToInstall } from './getPackagesToInstall';
import { installLeafyGreen } from './installLG';
import type { InstallCommandOptions } from './types';

// Mock dependencies
jest.mock('cross-spawn', () => ({
  spawn: jest.fn(),
}));

jest.mock('@lg-tools/meta', () => ({
  getPackageManager: jest.fn(),
}));

jest.mock('./getPackagesToInstall', () => ({
  getPackagesToInstall: jest.fn(),
}));

// Mock console.log to avoid noise in test output
console.log = jest.fn();
console.error = jest.fn();

describe('installLeafyGreen', () => {
  const mockSpawn = spawn as jest.MockedFunction<typeof spawn>;
  const mockGetPackageManager = getPackageManager as jest.MockedFunction<
    typeof getPackageManager
  >;
  const mockGetPackagesToInstall = getPackagesToInstall as jest.MockedFunction<
    typeof getPackagesToInstall
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetPackageManager.mockReturnValue('npm');
    mockGetPackagesToInstall.mockReturnValue([
      '@leafygreen-ui/button@latest',
      '@leafygreen-ui/modal@latest',
    ]);
  });

  test('should not call spawn if no packages are available', () => {
    mockGetPackagesToInstall.mockReturnValueOnce([]);

    installLeafyGreen([], {});

    expect(mockSpawn).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('No packages found to install');
  });

  test('should call spawn with correct parameters for npm', () => {
    mockGetPackageManager.mockReturnValueOnce('npm');

    installLeafyGreen([], {});

    expect(mockSpawn).toHaveBeenCalledWith(
      'npm',
      [
        'install',
        '@leafygreen-ui/button@latest',
        '@leafygreen-ui/modal@latest',
      ],
      { stdio: 'inherit' },
    );
  });

  test('should call spawn with correct parameters for yarn', () => {
    mockGetPackageManager.mockReturnValueOnce('yarn');

    installLeafyGreen([], {});

    expect(mockSpawn).toHaveBeenCalledWith(
      'yarn',
      ['add', '@leafygreen-ui/button@latest', '@leafygreen-ui/modal@latest'],
      { stdio: 'inherit' },
    );
  });

  test('should call spawn with correct parameters for pnpm', () => {
    mockGetPackageManager.mockReturnValueOnce('pnpm');

    installLeafyGreen([], {});

    expect(mockSpawn).toHaveBeenCalledWith(
      'pnpm',
      [
        'install',
        '@leafygreen-ui/button@latest',
        '@leafygreen-ui/modal@latest',
      ],
      { stdio: 'inherit' },
    );
  });

  test('should not call spawn if dry option is true', () => {
    installLeafyGreen([], { dry: true });

    expect(mockSpawn).not.toHaveBeenCalled();
  });

  test('should pass explicit packages to getPackagesToInstall', () => {
    const explicitPackages = ['button', 'modal'];

    installLeafyGreen(explicitPackages, {});

    expect(mockGetPackagesToInstall).toHaveBeenCalledWith(explicitPackages, {});
  });

  test('should pass all options to getPackagesToInstall', () => {
    const options: InstallCommandOptions = {
      verbose: true,
      essentials: true,
      basic: false,
      core: true,
      charts: false,
      chat: true,
    };

    installLeafyGreen([], options);

    expect(mockGetPackagesToInstall).toHaveBeenCalledWith([], options);
  });

  test('should pass verbose option to getPackagesToInstall and log extra information', () => {
    const options = { verbose: true };

    installLeafyGreen([], options);

    expect(mockGetPackagesToInstall).toHaveBeenCalledWith([], options);
    expect(console.log).toHaveBeenCalledWith('Detected package manager: npm');
  });

  test('should log extra information in dry run with verbose option', () => {
    const options = { dry: true, verbose: true };

    installLeafyGreen([], options);

    expect(mockSpawn).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      'Dry run—would have run command: ',
    );
  });
});
