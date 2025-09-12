import { renderHook } from '@leafygreen-ui/testing-lib';

import { useFirstRender } from '.';

describe('cloud-nav/utils/useFirstRender', () => {
  test('returns `true` on first render', () => {
    const { result } = renderHook(() => useFirstRender());
    expect(result.current).toBe(true);
  });

  test('runs effect on first render', () => {
    const effect = jest.fn();
    renderHook(effect => useFirstRender(effect), {
      initialProps: effect,
    });

    expect(effect).toHaveBeenCalled();
  });

  test('returns `false` on subsequent renders', () => {
    const { result, rerender } = renderHook(() => useFirstRender());
    rerender();
    expect(result.current).toBe(false);
    rerender();
    expect(result.current).toBe(false);
  });
});
