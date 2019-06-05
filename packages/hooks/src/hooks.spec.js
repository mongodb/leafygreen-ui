import React, { useEffect } from 'react';
import { act, renderHook } from 'react-hooks-testing-library';
import { render, cleanup } from 'react-testing-library';
import {
  useDocumentEventListener,
  useElementNode,
  useViewportSize,
} from './index';

afterAll(cleanup);

describe('packages/hooks', () => {
  describe('useDocumentEventListener', () => {
    test('event callback should fire when enabled is true', () => {
      const eventCallback = jest.fn();

      renderHook(() => useDocumentEventListener('click', eventCallback));

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(1);
    });

    test('event callback should not fire when enabled is false', () => {
      const eventCallback = jest.fn();

      renderHook(() =>
        useDocumentEventListener({
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
        ++count;
      }, [refEl]);
      return <div ref={setRefEl} />;
    }

    test('it gets called twice', () => {
      act(() => {
        render(<TestUseElementNode />);
      });

      // without setTimeout, test ran before final render
      setTimeout(() => {
        expect(count).toBe(2);
      }, 10);
    });
  });

  describe('useViewportSize', () => {
    const { result, rerender } = renderHook(() => useViewportSize());
    const debounceTimeoutLength = 100;
    const secondDebounceTimeoutLength = 200;

    test('responds to updates in window width', () => {
      act(() => {
        window.width = 200;
        window.dispatchEvent(new Event('resize'));
        rerender();
      });
      setTimeout(() => {
        expect(result.current.width).toBe(200);

        act(() => {
          window.width = 1024;
          window.dispatchEvent(new Event('resize'));
          rerender();
        });

        setTimeout(() => {
          expect(result.current.width).toBe(1024);
        }, secondDebounceTimeoutLength);
      }, debounceTimeoutLength);
    });
  });
});
