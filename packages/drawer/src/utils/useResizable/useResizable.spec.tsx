import { act } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { keyMap } from '@leafygreen-ui/lib';
import { useResizable } from './useResizable';
import { renderHook } from '@leafygreen-ui/testing-lib';
import { Position } from './useResizable.types';

// Mock window dimensions
Object.defineProperty(window, 'innerWidth', { value: 1024 });
Object.defineProperty(window, 'innerHeight', { value: 768 });

describe('useResizable', () => {
  const mockRef = {
    current: {
      offsetWidth: 300,
      offsetHeight: 300,
      style: {
        setProperty: jest.fn(),
        removeProperty: jest.fn(),
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns initial values when initialized', () => {
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 500,
        position: Position.Left,
        maxViewportPercentages: 50,
      }),
    );

    expect(result.current.size).toBe(300);
    expect(result.current.isResizing).toBe(false);
    expect(typeof result.current.getResizerProps).toBe('function');
    expect(result.current.resizableRef).toBeDefined();
  });

  test('updates size when setSize is called', () => {
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 500,
        position: Position.Left,
        maxViewportPercentages: 50,
      }),
    );

    act(() => {
      result.current.setSize(400);
    });

    expect(result.current.size).toBe(400);
  });

  test('calls onResize callback when resizing', () => {
    const onResize = jest.fn();
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 500,
        position: Position.Left,
        onResize,
        maxViewportPercentages: 50,
      }),
    );

    // current is read-only from outside the hook but for testing we can set it directly
    (result.current.resizableRef as any).current = mockRef.current;

    // Start resizing
    const resizerProps = result.current.getResizerProps();
    act(() => {
      // @ts-expect-error - onMouseDown expects all properties of MouseEvent
      resizerProps?.onMouseDown({
        preventDefault: jest.fn(),
        clientX: 300,
        clientY: 300,
      });
    });

    // Simulate mouse movement
    act(() => {
      fireEvent(
        window,
        new MouseEvent('mousemove', {
          clientX: 400,
          clientY: 300,
        }),
      );
    });

    // Check if onResize was called
    expect(onResize).toHaveBeenCalledWith(400);
  });

  describe.each([Position.Bottom, Position.Top, Position.Left, Position.Right])(
    'position: %s',
    position => {
      test('respects minSize constraint', () => {
        const onResize = jest.fn();
        const initialSize = 300;
        const { result } = renderHook(() =>
          useResizable({
            initialSize,
            minSize: 250,
            maxSize: 500,
            position: position as Position,
            onResize,
            maxViewportPercentages: 50,
          }),
        );

        // Override the ref to mock DOM element
        // current is read-only from outside the hook but for testing we can set it directly
        (result.current.resizableRef as any).current = mockRef.current;

        // Start resizing
        const resizerProps = result.current.getResizerProps();
        act(() => {
          // @ts-expect-error - onMouseDown expects all properties of MouseEvent
          resizerProps?.onMouseDown({
            preventDefault: jest.fn(),
            clientX: initialSize,
            clientY: initialSize,
          });
        });

        // Simulate mouse movement that would make size below minSize
        act(() => {
          fireEvent(
            window,
            new MouseEvent('mousemove', {
              clientX:
                position === Position.Right
                  ? initialSize + 100
                  : initialSize - 100,
              clientY:
                position === Position.Bottom
                  ? initialSize + 100
                  : initialSize - 100,
            }),
          );
        });

        // Check if minSize constraint was applied
        expect(result.current.size).toBe(250);
        expect(onResize).toHaveBeenCalledWith(250);
      });

      test('respects maxSize constraint', () => {
        const onResize = jest.fn();
        const initialSize = 300;
        const { result } = renderHook(() =>
          useResizable({
            initialSize,
            minSize: 100,
            maxSize: 400,
            position: position as Position,
            onResize,
            maxViewportPercentages: 60,
          }),
        );

        // Override the ref to mock DOM element
        // current is read-only from outside the hook but for testing we can set it directly
        (result.current.resizableRef as any).current = mockRef.current;

        // Start resizing
        const resizerProps = result.current.getResizerProps();
        act(() => {
          // @ts-expect-error - onMouseDown expects all properties of MouseEvent
          resizerProps?.onMouseDown({
            preventDefault: jest.fn(),
            clientX: initialSize,
            clientY: initialSize,
          });
        });

        // Simulate mouse movement that would make size above maxSize
        act(() => {
          fireEvent(
            window,
            new MouseEvent('mousemove', {
              clientX:
                position === Position.Right
                  ? initialSize - 200
                  : initialSize + 200,
              clientY:
                position === Position.Bottom
                  ? initialSize - 200
                  : initialSize + 200,
            }),
          );
        });

        // Check if maxSize constraint was applied
        expect(result.current.size).toBe(400);
        expect(onResize).toHaveBeenCalledWith(400);
      });

      test('respects maxViewportPercentage constraint', () => {
        const onResize = jest.fn();
        const initialSize = 300;
        const { result } = renderHook(() =>
          useResizable({
            initialSize,
            minSize: 100,
            maxSize: 900,
            position: position as Position,
            maxViewportPercentages: 50,
            onResize,
          }),
        );

        // current is read-only from outside the hook but for testing we can set it directly
        (result.current.resizableRef as any).current = mockRef.current;

        // Start resizing
        const resizerProps = result.current.getResizerProps();
        act(() => {
          // @ts-expect-error - onMouseDown expects all properties of MouseEvent
          resizerProps?.onMouseDown({
            preventDefault: jest.fn(),
            clientX: initialSize,
            clientY: initialSize,
          });
        });

        // Simulate mouse movement that would exceed viewport percentage
        act(() => {
          fireEvent(
            window,
            new MouseEvent('mousemove', {
              clientX:
                position === Position.Right
                  ? initialSize - 400
                  : initialSize + 400,
              clientY:
                position === Position.Bottom
                  ? initialSize - 200
                  : initialSize + 200,
            }),
          );
        });

        const maxViewportSize =
          position === Position.Right || position === Position.Left ? 512 : 384; // 50% of viewport width or height
        expect(result.current.size).toBe(maxViewportSize);
        expect(onResize).toHaveBeenCalledWith(maxViewportSize);
      });
    },
  );

  test('stops resizing on mouseup event', async () => {
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 500,
        position: Position.Right,
        maxViewportPercentages: 50,
      }),
    );

    // Override the ref to mock DOM element
    // current is read-only from outside the hook but for testing we can set it directly
    (result.current.resizableRef as any).current = mockRef.current;

    // Start resizing
    const resizerProps = result.current.getResizerProps();
    act(() => {
      // @ts-expect-error - onMouseDown expects all properties of MouseEvent
      resizerProps?.onMouseDown({
        preventDefault: jest.fn(),
        clientX: 300,
        clientY: 300,
      });
    });

    expect(result.current.isResizing).toBe(true);

    // Mock requestAnimationFrame to execute immediately
    const originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = cb => {
      return setTimeout(cb, 0);
    };

    // Stop resizing
    act(() => {
      fireEvent(window, new MouseEvent('mouseup'));
    });

    // Wait for all pending promises to resolve (including the setTimeout that mocks rAF)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isResizing).toBe(false);

    // Restore original requestAnimationFrame
    window.requestAnimationFrame = originalRAF;
  });

  test('handles keyboard interactions', () => {
    const onResize = jest.fn();
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 500,
        position: Position.Left,
        onResize,
        maxViewportPercentages: 50,
      }),
    );

    // Focus the resizer
    const resizerProps = result.current.getResizerProps();
    act(() => {
      resizerProps?.onFocus();
    });

    // Press right arrow to increase size
    act(() => {
      fireEvent.keyDown(window, { code: keyMap.ArrowRight });
    });

    expect(result.current.size).toBe(500);
    expect(onResize).toHaveBeenCalledWith(500);

    // Press left arrow to decrease size
    act(() => {
      fireEvent.keyDown(window, { code: keyMap.ArrowLeft });
    });

    expect(result.current.size).toBe(300);
    expect(onResize).toHaveBeenCalledWith(300);
  });

  test('does not resize when disabled', () => {
    const onResize = jest.fn();
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 500,
        position: Position.Right,
        onResize,
        enabled: false,
        maxViewportPercentages: 50,
      }),
    );

    // Check that getResizerProps returns an empty object
    const resizerProps = result.current.getResizerProps();
    expect(Object.keys(resizerProps || {}).length).toBe(0);
  });
});
