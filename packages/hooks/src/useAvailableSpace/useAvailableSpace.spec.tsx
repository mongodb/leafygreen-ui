import { renderHook } from '@testing-library/react-hooks';

import useAvailableSpace from './index';

describe('packages/hooks/useAvailableSpace', () => {
  test('returns the available space between the trigger and the bottom of the viewport', () => {
    const ref = {
      current: {
        getBoundingClientRect: () => ({ top: 0, bottom: 20 }),
      },
    };
    window.innerWidth = 400;
    window.innerHeight = 400;
    // @ts-expect-error ref is not typed as RefObject<HTMLElement>
    const { result } = renderHook(() => useAvailableSpace(ref));
    expect(result.current).toBe(372);
  });

  test('returns the available space between the trigger and the top of the viewport', () => {
    const ref = {
      current: {
        getBoundingClientRect: () => ({ top: 250, bottom: 270 }),
      },
    };
    window.innerWidth = 400;
    window.innerHeight = 400;
    // @ts-expect-error ref is not typed as RefObject<HTMLElement>
    const { result } = renderHook(() => useAvailableSpace(ref));
    expect(result.current).toBe(242);
  });
});
