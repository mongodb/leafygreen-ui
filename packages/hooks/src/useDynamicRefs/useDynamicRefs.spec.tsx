import { renderHook } from '@testing-library/react';

import { consoleOnce } from '@leafygreen-ui/lib';

import { DynamicRefGetter, useDynamicRefs } from '.';

describe('packages/hooks/useDynamicRefs', () => {
  test('returns a ref getter function', () => {
    const { result } = renderHook(() => useDynamicRefs({ prefix: 'A' }));
    expect(typeof result.current).toBe('function');
  });

  test('returns identical ref getter when rerendered ', () => {
    const { result, rerender } = renderHook(() =>
      useDynamicRefs({ prefix: 'A' }),
    );
    const getter1 = result.current;
    rerender();
    expect(result.current).toBe(getter1);
  });

  test('returns identical getters when called with the same prefix', () => {
    const { result: A } = renderHook(() => useDynamicRefs({ prefix: 'A' }));
    const { result: B } = renderHook(() => useDynamicRefs({ prefix: 'A' }));
    expect(A.current).toBe(B.current);
  });

  test('returns unique getters when called with different prefixes', () => {
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
      const getter: DynamicRefGetter<unknown> = result.current;
      const ref = getter();
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

    test('returns identical refs when the hook is called twice with the same prefix', async () => {
      const { result: A } = renderHook(() => useDynamicRefs({ prefix: 'A' }));
      const { result: A2 } = renderHook(() => useDynamicRefs({ prefix: 'A' }));
      const ref1 = A.current('key');
      const ref2 = A2.current('key');
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

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('TypeScript Error when called with different types', () => {
    type Mutable<T> = {
      -readonly [K in keyof T]: T[K];
    };

    const { result: A } = renderHook(() =>
      useDynamicRefs<HTMLButtonElement>({ prefix: 'A' }),
    );
    const { result: B } = renderHook(() =>
      useDynamicRefs<HTMLAnchorElement>({ prefix: 'A' }),
    );
    const refA = A.current('key');
    const refB = B.current('key');

    const newButton = document.createElement('button');
    const newLink = document.createElement('a');

    (refA.current as Mutable<typeof refA.current>) = newButton;
    (refB.current as Mutable<typeof refB.current>) = newLink;
  });
});
