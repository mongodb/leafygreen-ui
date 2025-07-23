import { isDefined } from '../isDefined';

/** Returns whether the provided value is some form of zero value */
export const isZeroLike = (val: any) =>
  !isDefined(val) || ['', '0', '00', 0].includes(val);

/** Returns whether the provided value is _not_ some form of zero value */
export const isNotZeroLike = (val: any) => !isZeroLike(val);
