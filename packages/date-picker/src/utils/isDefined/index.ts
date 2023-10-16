import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

/** Whether the value is _not_ `null` or `undefined` */
export const isDefined = <T>(
  val: T | null | undefined,
): val is Exclude<T, null | undefined> => {
  return !isUndefined(val) && !isNull(val);
};
