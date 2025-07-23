import { palette } from '@leafygreen-ui/palette';

import { Mode } from './mode';

/**
 * Apply the `focusRing` token as the `box-shadow` value for any elemnent when focused
 */
const focusRing = {
  [Mode.Light]: {
    /**
     * Use the default focus ring for any clickable element
     */
    default: `0 0 0 2px ${palette.white}, 0 0 0 4px ${palette.blue.light1}`,

    /**
     * Use the `input` focus ring for elements that have a cursor
     */
    input: `0 0 0 3px ${palette.blue.light1}`,
  },
  [Mode.Dark]: {
    /**
     * Use the default focus ring for any clickable element
     */
    default: `0 0 0 2px ${palette.black}, 0 0 0 4px ${palette.blue.light1}`,

    /**
     * Use the `input` focus ring for elements that have a cursor
     */
    input: `0 0 0 3px ${palette.blue.light1}`,
  },
} as const;

export default focusRing;
