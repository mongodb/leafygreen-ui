import { createRef, MutableRefObject } from 'react';
import { act, renderHook } from '@testing-library/react';

import { useReferenceElement } from './Popover.hooks';

describe('packages/popover/hooks', () => {
  describe('useReferenceElement', () => {
    test('if a `refEl` is provided, the ref value is used as the reference element', () => {
      const testRef: MutableRefObject<HTMLDivElement | null> =
        createRef<HTMLDivElement>();
      testRef.current = document.createElement('div');

      const { result } = renderHook(() => useReferenceElement(testRef));

      expect(result.current.referenceElement).toBe(testRef.current);
    });

    test('if the `refEl` changes between renders, the reference element should update', () => {
      const testRef: MutableRefObject<HTMLDivElement | null> =
        createRef<HTMLDivElement>();
      testRef.current = document.createElement('div');
      testRef.current.setAttribute('data-testid', 'testRef');

      const { result, rerender } = renderHook(
        ({ refEl }) => useReferenceElement(refEl),
        {
          initialProps: { refEl: testRef },
        },
      );

      const newRef: MutableRefObject<HTMLDivElement | null> =
        createRef<HTMLDivElement>();
      newRef.current = document.createElement('div');
      newRef.current.setAttribute('data-testid', 'newRef');

      rerender({ refEl: newRef });
      expect(result.current.referenceElement).toBe(newRef.current);
    });

    test('if `refEl.current` changes between renders, the reference element should update', () => {
      const testRef: MutableRefObject<HTMLDivElement | null> =
        createRef<HTMLDivElement>();
      testRef.current = document.createElement('div');
      testRef.current.setAttribute('data-testid', 'testRef');

      const { result, rerender } = renderHook(
        ({ refEl }) => useReferenceElement(refEl),
        {
          initialProps: { refEl: testRef },
        },
      );
      testRef.current = document.createElement('div');
      testRef.current.setAttribute('data-testid', 'testRef2');

      rerender({ refEl: testRef });
      expect(result.current.referenceElement).toBe(testRef.current);
    });

    test('if a `refEl` is not provided, the parent element of the placeholder is used as the reference element', () => {
      const { result } = renderHook(() => useReferenceElement());
      const placeholderElement = document.createElement('span');
      const parentElement = document.createElement('div');
      parentElement.appendChild(placeholderElement);

      act(() => {
        result.current.setPlaceholderElement(placeholderElement);
      });

      expect(result.current.referenceElement).toBe(parentElement);
    });
  });
});
