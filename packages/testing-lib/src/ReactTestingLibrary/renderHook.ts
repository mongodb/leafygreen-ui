import * as RTL from '@testing-library/react';

import { Exists } from './utils/types';

/**
 * Returns the type of `RenderHookOptions` from `@testing-library/react` if it exists,
 * otherwise defaults to a compatible type.
 */
export type RenderHookOptions<TProps> = Exists<
  typeof RTL,
  'RenderHookOptions',
  RTL.RenderOptions & {
    initialProps?: TProps;
  }
>;

/**
 * Returns the type of `RenderHookResult` from `@testing-library/react` if it exists,
 * otherwise defaults to a compatible type.
 */
export type RenderHookResult<TResult, TProps> = Exists<
  typeof RTL,
  'RenderHookResult',
  {
    current: TResult;
    rerender: (props?: TProps) => void;
    unmount: () => void;
    result: {
      all: Array<TResult>;
      current: TResult;
      error: Error;
    };
  }
>;

/**
 * Re-exports `renderHook` from `"@testing-library/react"` if it exists,
 * or from `"@testing-library/react-hooks"`
 *
 * (used when running in a React 17 test environment)
 */
export const renderHook: <TResult = any, TProps = any>(
  render: (initialProps: TProps) => TResult,
  options?: RenderHookOptions<TProps>,
) => RenderHookResult<TResult, TProps> =
  (RTL as any).renderHook ??
  (() => {
    const RHTL = require('@testing-library/react-hooks');
    return RHTL.renderHook;
  })();
