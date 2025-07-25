import React from 'react';
import { act } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { DisplayMode } from '../../Drawer/Drawer.types';

import {
  DrawerLayoutProvider,
  useDrawerLayoutContext,
} from './DrawerLayoutContext';

describe('useDrawerLayoutContext', () => {
  test('returns default values', () => {
    const { result } = renderHook(() => useDrawerLayoutContext());
    expect(result.current.isDrawerOpen).toBe(false);
    expect(result.current.resizable).toBe(false);
    expect(result.current.displayMode).toBe(DisplayMode.Overlay);
    expect(result.current.onClose).toBeUndefined();
    expect(result.current.hasToolbar).toBe(false);
    expect(typeof result.current.setIsDrawerOpen).toBe('function');
  });

  test('Returns the value passed to the provider', () => {
    const { result } = renderHook(() => useDrawerLayoutContext(), {
      wrapper: ({ children }) => (
        <DrawerLayoutProvider
          isDrawerOpen
          resizable
          displayMode={DisplayMode.Embedded}
          hasToolbar
        >
          {children}
        </DrawerLayoutProvider>
      ),
    });
    expect(result.current.isDrawerOpen).toBe(true);
    expect(result.current.resizable).toBe(true);
    expect(result.current.displayMode).toBe(DisplayMode.Embedded);
    expect(result.current.hasToolbar).toBe(true);
  });

  test('Updates isDrawerOpen when setIsDrawerOpen is called', () => {
    const { result } = renderHook(() => useDrawerLayoutContext(), {
      wrapper: ({ children }) => (
        <DrawerLayoutProvider isDrawerOpen>{children}</DrawerLayoutProvider>
      ),
    });
    expect(result.current.isDrawerOpen).toBe(true);
    act(() => {
      result.current.setIsDrawerOpen(false);
    });
    expect(result.current.isDrawerOpen).toBe(false);
  });
});
