import isUndefined from 'lodash/isUndefined';

/* UTILS */

export function exists<T extends string | Array<any>>(
  arg: T | undefined,
): arg is T {
  return !isUndefined(arg) && arg.length > 0;
}
