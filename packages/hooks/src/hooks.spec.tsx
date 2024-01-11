import { waitFor } from '@testing-library/react';

import { act, renderHook } from '@leafygreen-ui/testing-lib';

import {
  useEventListener,
  useIdAllocator,
  useObjectDependency,
  usePoller,
  usePrevious,
  useViewportSize,
} from './index';
import useValidation from './useValidation';

describe('packages/hooks', () => {
  describe('useEventListener', () => {
    test('event callback should only fire when enabled is true', () => {
      const eventCallback = jest.fn();

      renderHook(() => useEventListener('click', eventCallback));

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(1);
    });

    test('event callback should not fire when enabled is false', () => {
      const eventCallback = jest.fn();

      renderHook(() =>
        useEventListener('click', eventCallback, {
          enabled: false,
        }),
      );

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(0);
    });

    test('event callback should not fire when enabled is toggled false after being set to true', () => {
      const eventCallback = jest.fn();
      let initialValue = { enabled: true };

      const { rerender } = renderHook(() =>
        useEventListener('click', eventCallback, initialValue),
      );

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(1);

      initialValue = { enabled: false };
      eventCallback.mockReset();
      rerender();

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(0);
    });

    test('changing a dependency does not create an additional event listener', () => {
      const eventCallback = jest.fn();
      let initialValue = { enabled: true, dependencies: ['a'] };

      const { rerender } = renderHook(() =>
        useEventListener('click', eventCallback, initialValue),
      );

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(1);

      initialValue = { enabled: true, dependencies: ['b'] };
      rerender();

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(2);
    });
  });

  // Difficult to test a hook that measures changes to the DOM without having access to the DOM
  describe.skip('useMutationObserver', () => {}); //eslint-disable-line jest/no-disabled-tests

  test('useViewportSize responds to updates in window size', async () => {
    const { result, rerender } = renderHook(() => useViewportSize());

    const mutableWindow: { -readonly [K in keyof Window]: Window[K] } = window;
    const initialHeight = 360;
    const initialWidth = 480;

    mutableWindow.innerHeight = initialHeight;
    mutableWindow.innerWidth = initialWidth;

    window.dispatchEvent(new Event('resize'));
    rerender();
    await waitFor(() => {
      expect(result?.current?.height).toBe(initialHeight);
      expect(result?.current?.width).toBe(initialWidth);
    });

    const updateHeight = 768;
    const updateWidth = 1024;

    mutableWindow.innerHeight = updateHeight;
    mutableWindow.innerWidth = updateWidth;

    window.dispatchEvent(new Event('resize'));
    await waitFor(() => {
      expect(result?.current?.height).toBe(updateHeight);
      expect(result?.current?.width).toBe(updateWidth);
    });
  });

  describe('usePoller', () => {
    const mutableDocument: {
      -readonly [K in keyof Document]: Document[K];
    } = document;

    beforeEach(() => {
      jest.useFakeTimers();
      let { visibilityState } = document;

      Object.defineProperty(mutableDocument, 'visibilityState', {
        configurable: true,
        get() {
          return visibilityState;
        },
        set(state) {
          visibilityState = state;
        },
      });
    });

    afterEach(() => {
      mutableDocument.visibilityState = 'visible';
      jest.useRealTimers();
    });

    test('used with default values', async () => {
      const pollHandler = jest.fn();

      renderHook(() => usePoller(pollHandler));

      expect(pollHandler).toHaveBeenCalledTimes(1);

      // Need to let the Promise queue flush as well :(
      await Promise.resolve();
      jest.advanceTimersByTime(30e3);

      expect(pollHandler).toHaveBeenCalledTimes(2);
    });

    test('used with pollHandler that returns a Promise', async () => {
      const pollHandler = jest.fn(() => {
        return new Promise(resolve => {
          setTimeout(resolve, 1e3);
        });
      });

      renderHook(() => usePoller(pollHandler, { interval: 5e3 }));

      expect(pollHandler).toHaveBeenCalledTimes(1);

      // Let the pollHandler promise resolve
      await Promise.resolve();
      jest.advanceTimersByTime(1e3);

      // Then increment for the poll interval
      await Promise.resolve();
      jest.advanceTimersByTime(5e3);

      expect(pollHandler).toHaveBeenCalledTimes(2);
    });

    test('used with custom interval value', async () => {
      const pollHandler = jest.fn();

      renderHook(() => usePoller(pollHandler, { interval: 1e3 }));

      expect(pollHandler).toHaveBeenCalledTimes(1);

      // Advance through 2 polls
      // Need to let the Promise queue flush as well :(
      await Promise.resolve();
      jest.advanceTimersByTime(1e3);
      await Promise.resolve();
      jest.advanceTimersByTime(1e3);

      expect(pollHandler).toHaveBeenCalledTimes(3);
    });

    test('changing the enabled value', () => {
      const pollHandler = jest.fn();
      let enabled = true;

      const { rerender } = renderHook(() =>
        usePoller(pollHandler, { enabled }),
      );

      expect(pollHandler).toHaveBeenCalledTimes(1);

      enabled = false;
      rerender();

      jest.advanceTimersByTime(30e3);
      expect(pollHandler).toHaveBeenCalledTimes(1);

      pollHandler.mockReset();
      enabled = true;
      rerender();

      expect(pollHandler).toHaveBeenCalledTimes(1);
    });

    test('when immediate is false', () => {
      const pollHandler = jest.fn();
      let enabled = true;

      const { rerender } = renderHook(() =>
        usePoller(pollHandler, { immediate: false, enabled }),
      );

      expect(pollHandler).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(30e3);

      expect(pollHandler).toHaveBeenCalledTimes(1);

      enabled = false;
      rerender();

      expect(pollHandler).toHaveBeenCalledTimes(1);

      pollHandler.mockReset();
      enabled = true;
      rerender();

      expect(pollHandler).toHaveBeenCalledTimes(0);
    });

    test('when document is not visible', async () => {
      const pollHandler = jest.fn();

      const { rerender } = renderHook(() => usePoller(pollHandler));

      expect(pollHandler).toHaveBeenCalledTimes(1);

      mutableDocument.visibilityState = 'hidden';
      act(() => {
        document.dispatchEvent(new Event('visibilitychange'));
      });
      jest.advanceTimersByTime(30e3);

      expect(pollHandler).toHaveBeenCalledTimes(1);

      mutableDocument.visibilityState = 'visible';

      act(() => {
        document.dispatchEvent(new Event('visibilitychange'));
      });
      jest.advanceTimersByTime(30e3);

      rerender(pollHandler);

      // immediate triggers the pollHandler
      expect(pollHandler).toHaveBeenCalledTimes(2);
    });
  });

  describe('useObjectDependency', () => {
    test('returns previous object when current object is equal', () => {
      const originalObject = { a: 1, b: { c: [2, 'hello'] } };

      const { result, rerender } = renderHook(useObjectDependency, {
        initialProps: originalObject,
      });
      expect(result.current).toBe(originalObject);

      const differentButEqualObject = { a: 1, b: { c: [2, 'hello'] } };
      expect(differentButEqualObject).not.toBe(originalObject);
      rerender(differentButEqualObject);
      expect(result.current).toBe(originalObject);

      const unequalObject = { a: 1, b: { c: [2, 'bye'] } };
      expect(unequalObject).not.toBe(originalObject);
      rerender(unequalObject);
      expect(result.current).toBe(unequalObject);
    });
  });

  describe('usePrevious', () => {
    test('always returns value from previous render', () => {
      const { rerender, result } = renderHook(
        (props: number) => usePrevious(props),
        { initialProps: 42 },
      );

      expect(result.current).toEqual(undefined);

      rerender(2020);
      expect(result.current).toEqual(42);

      rerender(123);
      expect(result.current).toEqual(2020);

      rerender();
      expect(result.current).toEqual(123);
    });
  });

  describe('useIdAllocator', () => {
    test('it returns an id with the correct prefix when rendered', () => {
      const { result } = renderHook(() =>
        useIdAllocator({ prefix: 'checkbox' }),
      );
      expect(result.current).toEqual('checkbox-1');
    });

    test('when two hooks are rendered with the same prefix, they are still uniquely identified', () => {
      const { result: hook1 } = renderHook(() =>
        useIdAllocator({ prefix: 'tester' }),
      );
      const { result: hook2 } = renderHook(() =>
        useIdAllocator({ prefix: 'tester' }),
      );
      expect(hook1).not.toEqual(hook2);
    });

    test('when a fallback id is provided, hook returns that id', () => {
      const { result } = renderHook(() => useIdAllocator({ id: 'id' }));
      expect(result.current).toBe('id');
    });
  });

  describe('useValidation', () => {
    it('Returns validation functions when callback is defined', () => {
      const { result } = renderHook(() =>
        // eslint-disable-next-line no-console
        useValidation(value => console.log(value)),
      );
      expect(result.current.onBlur).toBeDefined();
      expect(result.current.onChange).toBeDefined();
    });

    it('Returns validation functions when callback is undefined', () => {
      const { result } = renderHook(() => useValidation());
      expect(result.current.onBlur).toBeDefined();
      expect(result.current.onChange).toBeDefined();
    });
  });
});
