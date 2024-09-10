import isUndefined from 'lodash/isUndefined';

import { cloneReverse } from '@leafygreen-ui/lib';

/** Returns the ordered parts to the left or right of the provided index
 * e.g:
 *
 * `getRemainingParts(right, 2, [a,b,c,d,e]) => [d,e]`
 *
 * `getRemainingParts(left, 2, [a,b,c,d,e]) => [b,a]`
 */
export const getRemainingParts = <T extends any>(
  dir: 'right' | 'left',
  index?: number,
  parts?: Array<T>,
) => {
  if (isUndefined(index)) return;

  return dir === 'left'
    ? cloneReverse(parts?.slice(0, index))
    : parts?.slice(index + 1);
};
