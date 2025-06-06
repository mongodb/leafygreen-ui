import fse from 'fs-extra';
import path from 'path';

import { getPackageRoot } from './index';

// Mock fs-extra module
jest.mock('fs-extra', () => ({
  existsSync: jest.fn(),
}));

describe('lg-tools/meta/getPackageRoot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Cast to any to access the mocked methods
    (fse.existsSync as jest.Mock).mockReset();
  });

  test('finds package.json in the current directory', () => {
    const mockDir = '/test/dir';
    const packageJsonPath = path.join(mockDir, 'package.json');

    // Mock fse.existsSync to return true for package.json
    (fse.existsSync as jest.Mock).mockImplementation(filePath => {
      return filePath === packageJsonPath;
    });

    const result = getPackageRoot(mockDir);

    expect(result).toBe(mockDir);
    expect(fse.existsSync).toHaveBeenCalledWith(packageJsonPath);
  });

  test('finds package.json in a parent directory', () => {
    const childDir = '/test/parent/child';
    const parentDir = '/test/parent';
    const rootDir = '/test';

    // Mock fse.existsSync to return true only for the parent directory
    (fse.existsSync as jest.Mock).mockImplementation(filePath => {
      return filePath === path.join(parentDir, 'package.json');
    });

    const result = getPackageRoot(childDir);

    expect(result).toBe(parentDir);
    expect(fse.existsSync).toHaveBeenCalledWith(
      path.join(childDir, 'package.json'),
    );
    expect(fse.existsSync).toHaveBeenCalledWith(
      path.join(parentDir, 'package.json'),
    );
    expect(fse.existsSync).not.toHaveBeenCalledWith(
      path.join(rootDir, 'package.json'),
    );
  });

  test('works with nested paths correctly', () => {
    const mockDir = '/test/deep/nested/folder/structure';
    const targetDir = '/test/deep';

    // Mock fse.existsSync to return true only for a specific parent directory
    (fse.existsSync as jest.Mock).mockImplementation(filePath => {
      return filePath === path.join(targetDir, 'package.json');
    });

    const result = getPackageRoot(mockDir);

    expect(result).toBe(targetDir);
    // Verify we correctly checked each level of directories
    expect(fse.existsSync).toHaveBeenCalledWith(
      path.join(mockDir, 'package.json'),
    );
    expect(fse.existsSync).toHaveBeenCalledWith(
      path.join('/test/deep/nested/folder', 'package.json'),
    );
    expect(fse.existsSync).toHaveBeenCalledWith(
      path.join('/test/deep/nested', 'package.json'),
    );
    expect(fse.existsSync).toHaveBeenCalledWith(
      path.join(targetDir, 'package.json'),
    );
  });
});
