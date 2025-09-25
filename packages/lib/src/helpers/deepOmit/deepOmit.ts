import isObject from 'lodash/isObject';
import omit from 'lodash/omit';

/**
 * Deeply omits properties from an object based on specified paths.
 *
 * @example
 * ```ts
 * const obj = {
 *  a: 1,
 *  b: {
 *   c: 2,
 *   d: 3,
 *   e: {
 *    f: 4
 *   }
 *  }
 * };
 * deepOmit(obj, ['b.d', 'd.e.f']);
 * // returns { a: 1, b: { c: 2, e: {} } }
 *```
 * @param obj
 * @param paths
 * @returns
 */
export function deepOmit(obj: Record<string, any>, paths: Array<string>) {
  const omittedObject: Record<string, any> = omit(obj, paths);

  for (const key in omittedObject) {
    const value = omittedObject[key];

    if (isObject(value)) {
      omittedObject[key] = deepOmit(omittedObject[key], paths);
    }
  }

  return omittedObject;
}
