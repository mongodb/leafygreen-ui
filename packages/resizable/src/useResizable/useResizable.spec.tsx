import { fireEvent } from '@testing-library/dom';
import { act } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { useResizable } from './useResizable';
import { KEYBOARD_RESIZE_PIXEL_STEP } from './useResizable.constants';
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
    },
  );

  test('stops resizing on mouseup event', async () => {
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 500,
        position: Position.Right,
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

  test('handles keyboard interactions with KEYBOARD_RESIZE_PIXEL_STEP increments', () => {
    const onResize = jest.fn();
    const initialSize = 300;
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 500,
        position: Position.Left,
        onResize,
      }),
    );

    // Get resizer props
    let resizerProps = result.current.getResizerProps();

    // Trigger keyDown directly since the hook handles keyboard events directly
    act(() => {
      resizerProps?.onKeyDown({
        code: 'ArrowRight',
        preventDefault: jest.fn(),
      } as unknown as React.KeyboardEvent);
    });

    const increasedSize = initialSize + KEYBOARD_RESIZE_PIXEL_STEP;
    expect(result.current.size).toBe(increasedSize);
    expect(onResize).toHaveBeenCalledWith(increasedSize);

    // Get the NEW resizer props after the re-render
    resizerProps = result.current.getResizerProps();

    // Press left arrow to decrease size
    act(() => {
      resizerProps?.onKeyDown({
        code: 'ArrowLeft',
        preventDefault: jest.fn(),
      } as unknown as React.KeyboardEvent);
    });

    // Should be back to initial size
    expect(result.current.size).toBe(initialSize);
    expect(onResize).toHaveBeenCalledWith(initialSize);
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
      }),
    );

    // Check that getResizerProps returns undefined
    const resizerProps = result.current.getResizerProps();
    expect(resizerProps).toBeUndefined();
  });

  test('applies min/max constraints when using keyboard navigation', () => {
    const onResize = jest.fn();
    const initialSize = 450;
    const maxSize = 500;
    const minSize = 100;
    const { result } = renderHook(() =>
      useResizable({
        initialSize,
        minSize,
        maxSize,
        position: Position.Right,
        onResize,
      }),
    );

    // Get resizer props
    let resizerProps = result.current.getResizerProps();

    // Press key to increase size beyond max
    act(() => {
      resizerProps?.onKeyDown({
        code: 'ArrowLeft',
        preventDefault: jest.fn(),
      } as unknown as React.KeyboardEvent);
    });

    // Should be constrained to maxSize
    expect(result.current.size).toBe(maxSize);
    expect(onResize).toHaveBeenCalledWith(maxSize);

    // Reset the size to near the minimum
    act(() => {
      result.current.setSize(minSize + 10);
    });
    onResize.mockClear();

    // Get the NEW resizer props after the re-render
    resizerProps = result.current.getResizerProps();

    // Press key to decrease size below min
    act(() => {
      resizerProps?.onKeyDown({
        code: 'ArrowRight',
        preventDefault: jest.fn(),
      } as unknown as React.KeyboardEvent);
    });

    // Should be constrained to minSize
    expect(result.current.size).toBe(minSize);
    expect(onResize).toHaveBeenCalledWith(minSize);
  });
});
