import { act, renderHook } from '@testing-library/react-hooks';
import { cleanup } from '@testing-library/react';
import useKeyPress from './useKeyPress';

afterAll(cleanup);

describe('useKeyPress', () => {
  test('returns true when key has been pressed', () => {
    const { result } = renderHook(() => useKeyPress(91));

    act(() => {
      document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
          bubbles: true,
          key: 'Meta',
          keyCode: 91,
        }),
      );
    });

    expect(result.current).toBe(true);
  });

  test('returns false when key has not been pressed', () => {
    const { result } = renderHook(() => useKeyPress(71));

    act(() => {
      document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
          bubbles: true,
          key: 'Meta',
          keyCode: 91,
        }),
      );
    });

    expect(result.current).toBe(false);
  });

  test('returns false when key has been pressed and released', () => {
    const { result } = renderHook(() => useKeyPress(91));

    act(() => {
      document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
          bubbles: true,
          key: 'Meta',
          keyCode: 91,
        }),
      );
    });

    act(() => {
      document.body.dispatchEvent(
        new KeyboardEvent('keyup', {
          bubbles: true,
          key: 'Meta',
          keyCode: 91,
        }),
      );
    });

    expect(result.current).toBe(false);
  });
});
