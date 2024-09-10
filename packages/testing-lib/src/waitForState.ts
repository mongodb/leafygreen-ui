import { act } from './RTLOverrides';

/**
 * Wrapper around `act`.
 *
 * Awaits an `act` call,
 * and returns the value of the state update callback
 */
export const waitForState = async <T extends any>(
  callback: () => T,
): Promise<T> => {
  let val: T;
  await act(() => {
    val = callback();
  });

  // @ts-expect-error - val is returned before TS sees it as being defined
  return val;
};
