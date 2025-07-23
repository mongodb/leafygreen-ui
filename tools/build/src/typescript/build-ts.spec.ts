import mockFs from 'mock-fs';

import { buildTypescript } from './build-ts';
import { runTypescriptDownlevel } from './downlevel';

// Only mock the downlevel function
jest.mock('./downlevel');

// Mock process.exit to prevent tests from actually exiting
const originalExit = process.exit;
let mockExit: jest.Mock;

describe('buildTypescript', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let originalCwd: () => string;

  beforeAll(() => {
    // Save original process.exit and cwd
    originalCwd = process.cwd;
    mockExit = jest.fn();
    process.exit = mockExit as any;
  });

  afterAll(() => {
    // Restore process.exit and cwd
    process.exit = originalExit;
    process.cwd = originalCwd;
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock console methods for output verification
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Set up base mock filesystem for all tests
    mockFs({
      '/test-project': {
        'package.json': '{"name": "test-project"}',
        'tsconfig.json': '{"compilerOptions": {}}',
        src: {
          'index.ts': 'console.log("Hello world");',
        },
      },
    });

    // Set cwd to our test directory
    jest.spyOn(process, 'cwd').mockReturnValue('/test-project');
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    mockFs.restore();
  });

  test('should run downlevel when option is provided', () => {
    buildTypescript([], { downlevel: true });
    expect(runTypescriptDownlevel).toHaveBeenCalled();
  });

  test('should not run downlevel when option is not provided', () => {
    buildTypescript();
    expect(runTypescriptDownlevel).not.toHaveBeenCalled();
  });

  test('should log verbose information when enabled', () => {
    buildTypescript([], { verbose: true });
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Building TypeScript'),
    );
  });

  test('should find tsconfig.json in the current directory', () => {
    buildTypescript();
    expect(consoleErrorSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('Could not find tsconfig'),
    );
  });

  test('should exit with error when tsconfig.json is not found', () => {
    // Remove tsconfig.json from mock filesystem
    mockFs.restore();
    mockFs({
      '/test-project': {
        'package.json': '{"name": "test-project"}',
        src: {
          'index.ts': 'console.log("Hello world");',
        },
      },
    });

    buildTypescript();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Could not find tsconfig'),
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
