import * as React from 'react';
import * as RTL from '@testing-library/react';
import path from 'path';

import {
  RenderHookServerOptions,
  RenderHookServerResult,
} from './renderHookServer';

/**
 * Utility type that returns `X.Y` if it exists, otherwise defaults to fallback type `Z`, or `any`
 */
export type Exists<
  X,
  Y extends keyof X | string,
  Z = unknown,
> = Y extends keyof X ? X[Y] : Z;

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

export type RenderHookOptions<TProps> = Exists<
  typeof RTL,
  'RenderHookOptions',
  RTL.RenderOptions & {
    initialProps?: TProps;
  }
>;

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
 * Re-exports `act` from `"@testing-library/react"` if it exists,
 * or from `"@testing-library/react-hooks"`
 *
 * (used when running in a React 17 test environment)
 */
export const act: Exists<typeof RTL, 'act'> =
  RTL.act ??
  (() => {
    const RHTL = require('@testing-library/react-hooks');
    return RHTL.act;
  })();

/**
 * Correct `renderHookServer` method based on React version.
 */
export const renderHookServer: <Hook extends () => any>(
  useHook: Hook,
  options?: RenderHookServerOptions,
) => RenderHookServerResult<Hook> = (() => {
  const isReact18 = parseInt(React.version.split('.')[0], 10) >= 18;
  const filename = isReact18 ? 'renderHookServer' : 'renderHookServerV17';
  const RHS = require(path.resolve(__dirname, filename));
  return RHS.renderHookServer;
})();
