import { renderHook } from '@testing-library/react-hooks';

import useViewportSize from '../useViewportSize';

import useAvailableSpace from './index';

jest.mock('../useViewportSize');

describe('packages/hooks/useAvailableSpace', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockUseViewportSize = jest.mocked(useViewportSize);
  test('returns the available space between the trigger and the bottom of the viewport', () => {
    const ref = {
      current: {
        getBoundingClientRect: () => ({ top: 0, bottom: 20 }),
      },
    };
    mockUseViewportSize.mockReturnValue({ height: 400, width: 400 });
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
    mockUseViewportSize.mockReturnValue({ height: 400, width: 400 });
    // @ts-expect-error ref is not typed as RefObject<HTMLElement>
    const { result } = renderHook(() => useAvailableSpace(ref));
    expect(result.current).toBe(242);
  });

  test('returns undefined if ref.current is null', () => {
    const ref = {
      current: null,
    };
    mockUseViewportSize.mockReturnValue({ height: 400, width: 400 });
    const { result } = renderHook(() => useAvailableSpace(ref));
    expect(result.current).toBeUndefined();
  });

  test('returns undefined if useViewportSize is null', () => {
    const ref = {
      current: {
        getBoundingClientRect: () => ({ top: 250, bottom: 270 }),
      },
    };
    mockUseViewportSize.mockReturnValue(null);
    // @ts-expect-error ref is not typed as RefObject<HTMLElement>
    const { result } = renderHook(() => useAvailableSpace(ref));
    expect(result.current).toBeUndefined();
  });
});
