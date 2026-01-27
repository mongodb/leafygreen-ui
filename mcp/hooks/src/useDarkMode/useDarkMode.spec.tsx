import { act, renderHook } from '@leafygreen-ui/testing-lib';

import { useDarkMode } from './useDarkMode';

describe('mcp/hooks/useDarkMode', () => {
  const originalMatchMedia = window.matchMedia;
  let listeners: Array<(event: MediaQueryListEvent) => void> = [];
  let currentMatches = false;

  beforeEach(() => {
    listeners = [];
    currentMatches = false;

    window.matchMedia = jest.fn().mockImplementation(() => ({
      get matches() {
        return currentMatches;
      },
      addEventListener: (
        _: string,
        cb: (event: MediaQueryListEvent) => void,
      ) => listeners.push(cb),
      removeEventListener: (
        _: string,
        cb: (event: MediaQueryListEvent) => void,
      ) => {
        listeners = listeners.filter(l => l !== cb);
      },
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  test('returns true when system prefers dark mode', () => {
    currentMatches = true;
    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toBe(true);
  });

  test('returns false when system prefers light mode', () => {
    currentMatches = false;
    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toBe(false);
  });

  test('override=true returns true regardless of system preference', () => {
    currentMatches = false;
    const { result } = renderHook(() => useDarkMode(true));
    expect(result.current).toBe(true);
  });

  test('override=false returns false regardless of system preference', () => {
    currentMatches = true;
    const { result } = renderHook(() => useDarkMode(false));
    expect(result.current).toBe(false);
  });

  test('updates when system preference changes from light to dark', () => {
    currentMatches = false;
    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toBe(false);

    act(() => {
      currentMatches = true;
      listeners.forEach(cb => cb({ matches: true } as MediaQueryListEvent));
    });

    expect(result.current).toBe(true);
  });

  test('updates when system preference changes from dark to light', () => {
    currentMatches = true;
    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toBe(true);

    act(() => {
      currentMatches = false;
      listeners.forEach(cb => cb({ matches: false } as MediaQueryListEvent));
    });

    expect(result.current).toBe(false);
  });
});
