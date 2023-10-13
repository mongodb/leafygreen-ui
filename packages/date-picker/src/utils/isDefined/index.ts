import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

/** Whether the value is _not_ `null` or `undefined` */
export const isDefined = (val: any): val is Exclude<any, null | undefined> => {
  return !isUndefined(val) && !isNull(val);
};
