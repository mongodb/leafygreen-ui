import * as RTL from '@testing-library/react';

type Exists<X, Y extends keyof X | string, Fallback = any> = Y extends keyof X
  ? X[Y]
  : Fallback;

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
