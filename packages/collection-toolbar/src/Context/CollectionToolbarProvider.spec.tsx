import React from 'react';
import { act } from '@testing-library/react';

import { isReact17, renderHook } from '@leafygreen-ui/testing-lib';

import { Size, Variant } from '../shared.types';
import { getLgIds } from '../utils';

import {
  CollectionToolbarProvider,
  useCollectionToolbarContext,
} from './CollectionToolbarProvider';

describe('packages/collection-toolbar/Context/CollectionToolbarProvider', () => {
  describe('useCollectionToolbarContext', () => {
    test('throws error when used outside of CollectionToolbarProvider', () => {
      /**
       * The version of `renderHook` imported from "@testing-library/react-hooks", (used in React 17)
       * has an error boundary, and doesn't throw errors as expected:
       * https://github.com/testing-library/react-hooks-testing-library/blob/main/src/index.ts#L5
       */
      if (isReact17()) {
        const { result } = renderHook(() => useCollectionToolbarContext());
        expect(result.error.message).toEqual(
          'useCollectionToolbarContext must be used within a CollectionToolbarProvider',
        );
      } else {
        expect(() => renderHook(() => useCollectionToolbarContext())).toThrow(
          'useCollectionToolbarContext must be used within a CollectionToolbarProvider',
        );
      }
    });

    test('returns context values when used within CollectionToolbarProvider', () => {
      const lgIds = getLgIds();
      const { result } = renderHook(() => useCollectionToolbarContext(), {
        wrapper: ({ children }) => (
          <CollectionToolbarProvider
            lgIds={lgIds}
            size={Size.Default}
            variant={Variant.Default}
          >
            {children}
          </CollectionToolbarProvider>
        ),
      });

      expect(result.current.size).toBe(Size.Default);
      expect(result.current.variant).toBe(Variant.Default);
      expect(result.current.lgIds).toEqual(lgIds);
      expect(result.current.isCollapsed).toBe(false);
      expect(result.current.onToggleCollapsed).toBeDefined();
    });
  });

  describe('CollectionToolbarProvider', () => {
    describe('size prop', () => {
      test('provides default size value', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds} size={Size.Default}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.size).toBe(Size.Default);
      });

      test('provides small size value', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds} size={Size.Small}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.size).toBe(Size.Small);
      });
    });

    describe('variant prop', () => {
      test('provides default variant value', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds} variant={Variant.Default}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.variant).toBe(Variant.Default);
      });

      test('provides compact variant value', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds} variant={Variant.Compact}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.variant).toBe(Variant.Compact);
      });

      test('provides collapsible variant value', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider
              lgIds={lgIds}
              variant={Variant.Collapsible}
            >
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.variant).toBe(Variant.Collapsible);
      });
    });

    describe('darkMode prop', () => {
      test('provides darkMode value when true', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds} darkMode={true}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.darkMode).toBe(true);
      });

      test('provides darkMode value when false', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds} darkMode={false}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.darkMode).toBe(false);
      });
    });

    describe('lgIds prop', () => {
      test('provides lgIds value', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.lgIds).toEqual(lgIds);
      });

      test('provides custom lgIds value', () => {
        const customLgIds = getLgIds('lg-custom-root');
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={customLgIds}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.lgIds).toEqual(customLgIds);
        expect(result.current.lgIds.root).toBe('lg-custom-root');
      });
    });

    describe('isCollapsed state', () => {
      test('defaults to false when isCollapsed prop is not provided', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.isCollapsed).toBe(false);
      });

      test('uses isCollapsed prop value when provided', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds} isCollapsed={true}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.isCollapsed).toBe(true);
      });

      test('syncs internal state when controlled prop changes', () => {
        const lgIds = getLgIds();
        const { result, rerender } = renderHook(
          () => useCollectionToolbarContext(),
          {
            wrapper: ({ children }) => (
              <CollectionToolbarProvider lgIds={lgIds} isCollapsed={false}>
                {children}
              </CollectionToolbarProvider>
            ),
          },
        );

        expect(result.current.isCollapsed).toBe(false);

        rerender({
          wrapper: ({ children }: { children: React.ReactNode }) => (
            <CollectionToolbarProvider lgIds={lgIds} isCollapsed={true}>
              {children}
            </CollectionToolbarProvider>
          ),
        });
      });
    });

    describe('onToggleCollapsed', () => {
      test('toggles isCollapsed state when called', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds} isCollapsed={false}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.isCollapsed).toBe(false);

        act(() => {
          result.current.onToggleCollapsed?.(
            {} as React.MouseEvent<HTMLButtonElement>,
          );
        });

        expect(result.current.isCollapsed).toBe(true);
      });

      test('toggles isCollapsed state back to false', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds} isCollapsed={true}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.isCollapsed).toBe(true);

        act(() => {
          result.current.onToggleCollapsed?.(
            {} as React.MouseEvent<HTMLButtonElement>,
          );
        });

        expect(result.current.isCollapsed).toBe(false);
      });

      test('calls onToggleCollapsed callback prop when toggle is called', () => {
        const lgIds = getLgIds();
        const onToggleCollapsedMock = jest.fn();
        const mockEvent = {} as React.MouseEvent<HTMLButtonElement>;

        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider
              lgIds={lgIds}
              isCollapsed={false}
              onToggleCollapsed={onToggleCollapsedMock}
            >
              {children}
            </CollectionToolbarProvider>
          ),
        });

        act(() => {
          result.current.onToggleCollapsed?.(mockEvent);
        });

        expect(onToggleCollapsedMock).toHaveBeenCalledTimes(1);
        expect(onToggleCollapsedMock).toHaveBeenCalledWith(mockEvent);
      });

      test('handles multiple toggle calls correctly', () => {
        const lgIds = getLgIds();
        const { result } = renderHook(() => useCollectionToolbarContext(), {
          wrapper: ({ children }) => (
            <CollectionToolbarProvider lgIds={lgIds} isCollapsed={false}>
              {children}
            </CollectionToolbarProvider>
          ),
        });

        expect(result.current.isCollapsed).toBe(false);

        act(() => {
          result.current.onToggleCollapsed?.(
            {} as React.MouseEvent<HTMLButtonElement>,
          );
        });
        expect(result.current.isCollapsed).toBe(true);

        act(() => {
          result.current.onToggleCollapsed?.(
            {} as React.MouseEvent<HTMLButtonElement>,
          );
        });
        expect(result.current.isCollapsed).toBe(false);

        act(() => {
          result.current.onToggleCollapsed?.(
            {} as React.MouseEvent<HTMLButtonElement>,
          );
        });
        expect(result.current.isCollapsed).toBe(true);
      });
    });
  });
});
