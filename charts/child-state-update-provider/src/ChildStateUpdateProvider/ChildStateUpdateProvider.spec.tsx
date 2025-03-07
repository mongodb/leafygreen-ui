import { act, renderHook } from '@testing-library/react';

import {
  ChildStateUpdateProvider,
  useChildStateUpdateContext,
} from './ChildStateUpdateProvider';

describe('@lg-charts/drag-child-state-update-provider', () => {
  test('should update child state object when updateDragChildState() is called', () => {
    const { result } = renderHook(() => useChildStateUpdateContext(), {
      wrapper: ChildStateUpdateProvider,
    });

    expect(result?.current?.childStateUpdates).toEqual({});

    act(() => {
      result?.current?.updateChildState('dragId', { isOpen: true });
    });

    expect(result?.current?.childStateUpdates).toEqual({
      dragId: { isOpen: true },
    });
  });

  test('returns null when not in provider', () => {
    const { result } = renderHook(() => useChildStateUpdateContext());
    expect(result?.current).toBe(null);
  });
});
