import { useMemo } from 'react';
import { renderHook, waitFor } from '@testing-library/react';

import { type LoadersMap, useLazyModules } from './useLazyModules';

// Mock console.error to prevent error logs in tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useLazyModules', () => {
  interface TestModules {
    moduleA: { valueA: string };
    moduleB: { valueB: number };
    moduleC: { valueC: boolean };
  }

  test('returns empty modules and not loading when no loaders provided', () => {
    const { result } = renderHook(() => {
      const loaders = useMemo(() => ({}), []);
      return useLazyModules<TestModules>(loaders);
    });

    expect(result.current.modules).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  test('loads single module successfully', async () => {
    const mockModuleA = { valueA: 'test' };

    const { result } = renderHook(() => {
      const loaders: LoadersMap<Partial<TestModules>> = useMemo(
        () => ({
          moduleA: jest.fn().mockResolvedValue(mockModuleA),
        }),
        [],
      );
      return useLazyModules<TestModules>(loaders);
    });

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.modules).toEqual({});

    // Wait for module to load with shorter timeout
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 },
    );

    expect(result.current.modules).toEqual({ moduleA: mockModuleA });
  });

  test('loads multiple modules concurrently', async () => {
    const mockModuleA = { valueA: 'test' };
    const mockModuleB = { valueB: 42 };

    const { result } = renderHook(() => {
      const loaders: LoadersMap<Partial<TestModules>> = useMemo(
        () => ({
          moduleA: jest.fn().mockResolvedValue(mockModuleA),
          moduleB: jest.fn().mockResolvedValue(mockModuleB),
        }),
        [],
      );
      return useLazyModules<TestModules>(loaders);
    });

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);

    // Wait for modules to load
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 },
    );

    expect(result.current.modules).toEqual({
      moduleA: mockModuleA,
      moduleB: mockModuleB,
    });
  });

  test('handles module loading errors gracefully', async () => {
    const mockModuleA = { valueA: 'test' };

    const { result } = renderHook(() => {
      const loaders: LoadersMap<Partial<TestModules>> = useMemo(
        () => ({
          moduleA: jest.fn().mockResolvedValue(mockModuleA),
          moduleB: jest.fn().mockRejectedValue(new Error('Load failed')),
        }),
        [],
      );
      return useLazyModules<TestModules>(loaders);
    });

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 },
    );

    // Should only have the successfully loaded module
    expect(result.current.modules).toEqual({ moduleA: mockModuleA });
    expect(console.error).toHaveBeenCalledWith(
      'Error loading module "moduleB":',
      expect.any(Error),
    );
  });

  test('handles loader functions that return undefined', async () => {
    const mockModuleA = { valueA: 'test' };

    const { result } = renderHook(() => {
      const loaders: LoadersMap<Partial<TestModules>> = useMemo(
        () => ({
          moduleA: jest.fn().mockResolvedValue(mockModuleA),
          moduleB: jest.fn().mockResolvedValue(undefined),
        }),
        [],
      );
      return useLazyModules<TestModules>(loaders);
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 },
    );

    // Should only have the module that resolved to an actual value
    expect(result.current.modules).toEqual({ moduleA: mockModuleA });
  });
});
