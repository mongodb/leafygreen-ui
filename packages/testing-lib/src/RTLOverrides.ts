import * as React from 'react';
import * as RTL from '@testing-library/react';
import path from 'path';

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
export const renderHook: Exists<typeof RTL, 'renderHook'> =
  (RTL as any).renderHook ??
  (() => {
    const RHTL = require('@testing-library/react-hooks');
    return RHTL.renderHook;
  })();

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
 * Exports correct `renderHookServer` method based on React version.
 */
export const renderHookServer = (() => {
  const isReact18 = parseInt(React.version.split('.')[0], 10) >= 18;
  const filename = isReact18 ? 'renderHookServer.js' : 'renderHookServerV17.js';
  const RHS = require(path.resolve(__dirname, filename));
  return RHS.renderHookServer;
})();
