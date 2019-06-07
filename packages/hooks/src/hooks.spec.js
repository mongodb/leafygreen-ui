import React, { useEffect } from 'react';
import { act, renderHook } from 'react-hooks-testing-library';
import { render, cleanup } from 'react-testing-library';
import { useEventListener, useElementNode, useViewportSize } from './index';

afterAll(cleanup);

describe('packages/hooks', () => {
  describe('useEventListener', () => {
    test('event callback should fire when enabled is true', () => {
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
        useEventListener({
          type: 'click',
          eventCallback,
          enabled: false,
        }),
      );

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(0);
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
});
