import React from 'react';
import { act } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { DisplayMode, Size } from '../../Drawer/Drawer.types';

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
    expect(result.current.isDrawerResizing).toBe(false);
    expect(result.current.drawerWidth).toBe(0);
    expect(result.current.size).toBe(Size.Default);
    expect(typeof result.current.setIsDrawerOpen).toBe('function');
    expect(typeof result.current.setDrawerWidth).toBe('function');
    expect(typeof result.current.setIsDrawerResizing).toBe('function');
  });

  test('Returns the value passed to the provider', () => {
    const { result } = renderHook(() => useDrawerLayoutContext(), {
      wrapper: ({ children }) => (
        <DrawerLayoutProvider
          isDrawerOpen
          resizable
          displayMode={DisplayMode.Embedded}
          hasToolbar
          size={Size.Large}
        >
          {children}
        </DrawerLayoutProvider>
      ),
    });
    expect(result.current.isDrawerOpen).toBe(true);
    expect(result.current.resizable).toBe(true);
    expect(result.current.displayMode).toBe(DisplayMode.Embedded);
    expect(result.current.hasToolbar).toBe(true);
    expect(result.current.size).toBe(Size.Large);
  });

  test('Updates isDrawerOpen when setIsDrawerOpen is called', () => {
    const { result } = renderHook(() => useDrawerLayoutContext(), {
      wrapper: ({ children }) => (
        <DrawerLayoutProvider isDrawerOpen>{children}</DrawerLayoutProvider>
      ),
    });
    expect(result.current.isDrawerOpen).toBe(true);
    act(() => {
      result?.current?.setIsDrawerOpen?.(false);
    });
    expect(result.current.isDrawerOpen).toBe(false);
  });

  test('Updates drawerWidth when setDrawerWidth is called', () => {
    const { result } = renderHook(() => useDrawerLayoutContext(), {
      wrapper: ({ children }) => (
        <DrawerLayoutProvider>{children}</DrawerLayoutProvider>
      ),
    });
    expect(result.current.drawerWidth).toBe(0);
    act(() => {
      result?.current?.setDrawerWidth?.(100);
    });
    expect(result.current.drawerWidth).toBe(100);
  });

  test('Updates isDrawerResizing when setIsDrawerResizing is called', () => {
    const { result } = renderHook(() => useDrawerLayoutContext(), {
      wrapper: ({ children }) => (
        <DrawerLayoutProvider>{children}</DrawerLayoutProvider>
      ),
    });
    expect(result.current.isDrawerResizing).toBe(false);
    act(() => {
      result?.current?.setIsDrawerResizing?.(true);
    });
    expect(result.current.isDrawerResizing).toBe(true);
  });
});
