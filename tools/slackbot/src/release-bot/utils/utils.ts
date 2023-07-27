import { isUndefined } from 'lodash';

/* UTILS */

export function exists<T extends string | Array<any>>(
  arg: T | undefined,
): arg is T {
  return !isUndefined(arg) && arg.length > 0;
}

export function isValidJSON(str?: string): boolean {
  if (!str) return false;
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}
