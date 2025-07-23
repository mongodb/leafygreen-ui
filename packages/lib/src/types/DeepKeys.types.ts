/**
 * Given an object, this returns all possible deep keys
 * as a union of dot-separated string literals.
 *
 * e.g.
 * DeepKeys<{
 *  a: {
 *    b: {
 *      c: ''
 *    },
 *    d: ''
 *  }
 * }> // 'a' | 'a.b' | 'a.b.c' | 'a.d'
 *
 */
export type DeepKeys<
  T, // The type of the object for which we want to extract deep keys.
  P extends string = '', // a string that keeps track of the current key path
> = T extends object
  ? {
      [K in keyof T & (string | number)]: P extends ''
        ? `${K}` | DeepKeys<T[K], `${K}`>
        : `${P}.${K}` | DeepKeys<T[K], `${P}.${K}`>;
    }[keyof T & (string | number)]
  : never;
