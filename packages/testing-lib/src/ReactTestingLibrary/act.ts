import { isReact17 } from './utils/isReact17';

/**
 * Type of `act` from `@testing-library/react` if it exists,
 * otherwise defaults to compatible type.
 */
export type ActType =
  | ((cb: () => void) => void)
  | ((cb: () => Promise<void>) => Promise<void>);

/**
 * Re-exports `act` from `"@testing-library/react"` in React18+
 * or from `"@testing-library/react-hooks"` in React17 environments
 */
export const act: ActType = (() => {
  if (isReact17()) {
    const RHTL = require('@testing-library/react-hooks');
    return RHTL.act;
  } else {
    const RTL = require('@testing-library/react');
    return RTL.act;
  }
})();
