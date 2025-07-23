/**
 * Returns a recursive union the values for a given type.
 *
 * e.g.
 * ```ts
 * const x = {
 *   a: {
 *     b: {
 *       c: 'foo'
 *     },
 *    d: 'bar'
 *   }
 *  e: 'baz'
 * }
 *
 * DeepUnion<typeof x> // 'foo' | 'bar' | 'baz'
 * ```
 */
export type DeepUnion<T extends string | Record<string, any>> = T extends object
  ? {
      [K in keyof T]: DeepUnion<T[K]>;
    }[keyof T]
  : T;
