import { act } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { keyMap } from '@leafygreen-ui/lib';
import { useResizable } from './useResizable';
import { HandleType } from './useResizable.types';
import { renderHook } from '@leafygreen-ui/testing-lib';

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
        handleType: 'right',
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
        handleType: 'right',
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
        handleType: 'right',
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

  test('respects minSize constraint', () => {
    const onResize = jest.fn();
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 250,
        maxSize: 500,
        handleType: 'right',
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
        clientX: 300,
        clientY: 300,
      });
    });

    // Simulate mouse movement that would make size below minSize
    act(() => {
      fireEvent(
        window,
        new MouseEvent('mousemove', {
          clientX: 200,
          clientY: 300,
        }),
      );
    });

    // Check if minSize constraint was applied
    expect(result.current.size).toBe(250);
    expect(onResize).toHaveBeenCalledWith(250);
  });

  test('respects maxSize constraint', () => {
    const onResize = jest.fn();
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 400,
        handleType: 'right',
        onResize,
        maxViewportPercentages: 50,
      }),
    );

    // Override the ref to mock DOM element
    // Object.defineProperty(result.current, 'resizableRef', {
    //   get: () => mockRef,
    // });

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

    // Simulate mouse movement that would make size above maxSize
    act(() => {
      fireEvent(
        window,
        new MouseEvent('mousemove', {
          clientX: 500,
          clientY: 300,
        }),
      );
    });

    // Check if maxSize constraint was applied
    expect(result.current.size).toBe(400);
    expect(onResize).toHaveBeenCalledWith(400);
  });

  test('respects maxViewportPercentage constraint', () => {
    const onResize = jest.fn();
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 900,
        handleType: 'right',
        maxViewportPercentages: 50, // 50% of window.innerWidth (1024) = 512
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

    // Simulate mouse movement that would exceed viewport percentage
    act(() => {
      fireEvent(
        window,
        new MouseEvent('mousemove', {
          clientX: 700,
          clientY: 300,
        }),
      );
    });

    // Check if viewport percentage constraint was applied (50% of 1024 = 512)
    expect(result.current.size).toBe(512);
    expect(onResize).toHaveBeenCalledWith(512);
  });

  test('stops resizing on mouseup event', async () => {
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 500,
        handleType: 'right',
        maxViewportPercentages: 50,
      }),
    );

    // // Override the ref to mock DOM element
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

  test('handles keyboard interactions for right handle', () => {
    const onResize = jest.fn();
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 500,
        handleType: 'right',
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

  test('handles keyboard interactions for left handle', () => {
    const onResize = jest.fn();
    const { result } = renderHook(() =>
      useResizable({
        initialSize: 300,
        minSize: 100,
        maxSize: 500,
        handleType: 'left',
        onResize,
        maxViewportPercentages: 50,
      }),
    );

    // Focus the resizer
    const resizerProps = result.current.getResizerProps();
    act(() => {
      resizerProps?.onFocus();
    });

    // Press left arrow to increase size
    act(() => {
      fireEvent.keyDown(window, { code: keyMap.ArrowLeft });
    });

    expect(result.current.size).toBe(500);
    expect(onResize).toHaveBeenCalledWith(500);

    // Press right arrow to decrease size
    act(() => {
      fireEvent.keyDown(window, { code: keyMap.ArrowRight });
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
        handleType: 'right',
        onResize,
        enabled: false,
        maxViewportPercentages: 50,
      }),
    );

    // Check that getResizerProps returns an empty object
    const resizerProps = result.current.getResizerProps();
    expect(Object.keys(resizerProps || {}).length).toBe(0);

    // Try to set size
    act(() => {
      result.current.setSize(400);
    });

    // Size should still update because setSize is always available
    expect(result.current.size).toBe(400);
  });
});
