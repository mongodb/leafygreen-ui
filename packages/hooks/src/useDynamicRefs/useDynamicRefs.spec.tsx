import { renderHook } from '@testing-library/react';

import { consoleOnce } from '@leafygreen-ui/lib';

import { useDynamicRefs } from '.';

describe('packages/hooks/useDynamicRefs', () => {
  test('returns a ref getter function', () => {
    const { result } = renderHook(() => useDynamicRefs({ prefix: '' }));
    expect(typeof result.current).toBe('function');
  });

  test('returns identical ref getter when rerendered ', () => {
    const { result, rerender } = renderHook(() =>
      useDynamicRefs({ prefix: '' }),
    );
    const getter1 = result.current;
    rerender({ prefix: '' });
    expect(result.current).toBe(getter1);
  });

  test('returns unique getters when called multiple times', () => {
    const { result: A } = renderHook(() => useDynamicRefs({ prefix: 'A' }));
    const { result: B } = renderHook(() => useDynamicRefs({ prefix: 'B' }));
    expect(A.current).not.toBe(B.current);
  });

  describe('ref getter function', () => {
    test('returns a ref when called with a key', async () => {
      const { result } = renderHook(() => useDynamicRefs({ prefix: 'A' }));
      const ref = result.current('key');
      expect(ref).toHaveProperty('current');
    });

    test('returns `undefined` when called without a key', () => {
      const { result } = renderHook(() => useDynamicRefs({ prefix: 'A' }));
      const ref = result.current();
      expect(ref).toBeUndefined();
    });

    test('logs an error when called without a key', () => {
      const error = jest
        .spyOn(consoleOnce, 'error')
        .mockImplementation(() => {});
      const { result } = renderHook(() => useDynamicRefs({ prefix: 'A' }));
      result.current();
      expect(error).toHaveBeenCalled();
    });

    test('returns identical refs when called with the same key', async () => {
      const { result } = renderHook(() => useDynamicRefs({ prefix: 'A' }));
      const ref1 = result.current('key');
      const ref2 = result.current('key');
      expect(ref1).toBe(ref2);
    });

    test('returns unique refs when unique getters are called with the same key', () => {
      const { result: A } = renderHook(() => useDynamicRefs({ prefix: 'A' }));
      const { result: B } = renderHook(() => useDynamicRefs({ prefix: 'B' }));
      const refA = A.current('key');
      const refB = B.current('key');
      expect(refA).not.toBe(refB);
    });
  });
});
