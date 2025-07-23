import { act, renderHook } from '@testing-library/react';
import { keyMap } from '@leafygreen-ui/lib';
import { useResizable } from './useResizable';
import { HandleType } from './useResizable.types';

// Mock window dimensions
Object.defineProperty(window, 'innerWidth', { value: 1024 });
Object.defineProperty(window, 'innerHeight', { value: 768 });

describe('useResizable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns initial values when initialized', () => {
    const { result } = renderHook(() => 
      useResizable({ 
        initialSize: 300,
        minSize: 100