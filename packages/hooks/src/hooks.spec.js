import React, { useEffect } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { render, cleanup } from '@testing-library/react';
import {
  useEventListener,
  useElementNode,
  useViewportSize,
  usePoller,
} from './index';

afterAll(cleanup);

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

  describe('useElementNode', () => {
    let count = 0;

    function TestUseElementNode() {
      const [refEl, setRefEl] = useElementNode();
      useEffect(() => {
        count += 1;
      }, [refEl]);
      return <div ref={setRefEl} />;
    }

    test('it gets called twice', () => {
      act(() => {
        render(<TestUseElementNode />);
      });

      // using jest default timeout so that the component has enough
      // time to render before the tests are called
      setTimeout(() => {
        expect(count).toBe(2);
      }, 4500);
    });
  });

  describe('useViewportSize', () => {
    const { result, rerender } = renderHook(() => useViewportSize());
    const debounceTimeoutLength = 100;
    const initialWidth = 200;
    const updateWidth = 1024;

    test('responds to updates in window width', () => {
      act(() => {
        window.width = initialWidth;
        window.dispatchEvent(new Event('resize'));
        rerender();
      });
      setTimeout(() => {
        expect(result.current.width).toBe(initialWidth);

        act(() => {
          window.width = updateWidth;
          window.dispatchEvent(new Event('resize'));
          rerender();
        });

        setTimeout(() => {
          expect(result.current.width).toBe(updateWidth);
        }, debounceTimeoutLength * 2);
      }, debounceTimeoutLength);
    });
  });

  describe('usePoller', () => {
    let visibilityState = 'visible';

    beforeAll(() => {
      jest.useFakeTimers();

      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get() {
          return visibilityState;
        },
        set(bool) {
          visibilityState = Boolean(bool);
        },
      });
    });

    afterAll(() => {
      visibilityState = 'visible';
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

    test('when document is not visible', () => {
      const pollHandler = jest.fn();

      renderHook(() => usePoller(pollHandler));

      expect(pollHandler).toHaveBeenCalledTimes(1);

      act(() => {
        visibilityState = 'hidden';
        document.dispatchEvent(new Event('visibilitychange'));
      });

      jest.advanceTimersByTime(30e3);

      expect(pollHandler).toHaveBeenCalledTimes(1);

      act(() => {
        visibilityState = 'visible';
        document.dispatchEvent(new Event('visibilitychange'));
      });

      // immediate triggers the pollHandler
      expect(pollHandler).toHaveBeenCalledTimes(2);
    });
  });
});
