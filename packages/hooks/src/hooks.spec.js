import { act, cleanup, renderHook } from 'react-hooks-testing-library';
import { useDocumentListener, useElementNode, useViewportSize } from './index';

afterAll(cleanup);

describe('packages/hooks', () => {
  describe('useDocumentListener', () => {
    test('event callback should fire when enabled is true', () => {
      const eventCallback = jest.fn();

      renderHook(() => useDocumentListener('click', eventCallback, true));

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(1);
    });

    test('event callback should not fire when enabled is false', () => {
      const eventCallback = jest.fn();

      renderHook(() => useDocumentListener('click', eventCallback, false));

      act(() => {
        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(eventCallback).toHaveBeenCalledTimes(0);
    });
  });

  // describe('useMutationObserver', () => {})

  describe('useElementNode', () => {
    const { result } = renderHook(() => useElementNode());

    test('returns an array where the first element refers to the ref node', () => {
      expect(result.current[0] === null).toBe(true);
    });

    test('returns an array where the second element is a callback to update the ref node', () => {
      expect(typeof result.current[1]).toBe('function');
    });
  });

  describe('useViewportSize', () => {
    test('XXXX', () => {
      const hook = renderHook(() => useViewportSize());

      act(() => {
        window.innerWidth = 500;
        window.innerHeight = 200;
        window.dispatchEvent(new Event('resize'));
        hook.rerender();
      });

      expect(hook.result.current.width).toBe(500);
      expect(hook.result.current.height).toBe(200);
    });
  });
});
