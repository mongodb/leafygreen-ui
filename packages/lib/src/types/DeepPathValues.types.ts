import { Concat } from './Concat.types';

/**
 * Maps the deep keys of an object to their path values.
 *
 * e.g.
 * ```ts
 * DeepPathValues<{
 *  a: {
 *   b: {
 *    c: any
 *    d: any
 *   },
 *   e: any
 *  }
 *  f: any
 * }>
 * // returns:
 * //{
 * // a: {
 * //  b: {
 * //   c: 'a.b.c'
 * //   d: 'a.b.d'
 * //  },
 * //  e: 'a.e'
 * // }
 * // f: 'f'
 * //}
 * ```
 */
export type DeepPathValues<
  T extends object, // The type of the object for which we want to extract deep keys.
  Path extends string = '', // a string that keeps track of the current key path
  Separator extends string = '.', // the separator used to concatenate the paths
> = {
  [Key in keyof T]: Key extends string // For each key in the object
    ? T[Key] extends object // if the value is an object
      ? DeepPathValues<T[Key], Concat<Path, Key, Separator>>
      : Concat<Path, Key, Separator> // if the value is not an object, return the deep key
    : never;
};
