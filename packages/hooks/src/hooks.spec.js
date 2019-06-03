import React, { useEffect } from 'react';
import { act, renderHook } from 'react-hooks-testing-library';
import { render, cleanup } from 'react-testing-library';
import { useDocumentListener, useElementNode, useViewportSize } from './index';

afterAll(cleanup);

describe('packages/hooks', () => {
  describe('useDocumentListener', () => {
    test('event callback should fire when enabled is true', () => {
      const eventCallback = jest.fn();

      renderHook(() => useDocumentListener('click', eventCallback));

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(1);
    });

    test('event callback should not fire when enabled is false', () => {
      const eventCallback = jest.fn();

      renderHook(() =>
        useDocumentListener({ type: 'click', eventCallback, enabled: false }),
      );

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(0);
    });
  });

  describe.skip('useMutationObserver', () => {}); //eslint-disable-line jest/no-disabled-tests

  describe('useElementNode', () => {
    let count = 1;

    function TestUseElementNode() {
      const [refEl, setRefEl] = useElementNode();
      useEffect(() => {
        count += 1;
      }, [refEl]);
      return <div ref={setRefEl} />;
    }

    render(<TestUseElementNode />);

    test('it gets called twice', () => {
      expect(count).toEqual(2);
    });

    const { result } = renderHook(() => useElementNode());

    test('returns an array where the first element refers to the ref node', () => {
      expect(result.current[0] === null).toBe(true);
    });

    test('returns an array where the second element is a callback to update the ref node', () => {
      expect(typeof result.current[1]).toBe('function');
    });
  });

  describe('useViewportSize', () => {
    test('responds to window resize event and returns an object with updated width and height', () => {
      const { result, rerender } = renderHook(() => useViewportSize());

      act(() => {
        window.innerWidth = 500;
        window.dispatchEvent(new Event('resize'));
        rerender();
      });
      expect(result.current.width).toBe(500);

      act(() => {
        window.innerHeight = 500;
        window.dispatchEvent(new Event('resize'));
        rerender();
      });
      expect(result.current.height).toBe(500);
    });
  });
});
