/**
 * Deeply picks the specified dot-separated keys from the object.
 *
 * e.g.
 * ```
 * interface Foo {
 *  a: {
 *    b: {
 *      c: any
 *    },
 *    d: any
 *  }
 * }
 *
 * DeepPick<Foo, 'a.b'> // { a: { b: any } }
 * ```
 *
 */
export type DeepPick<T, K> = K extends keyof T
  ? Pick<T, K> // Direct match, return the type
  : K extends `${infer Key}.${infer Rest}` // Handle nested paths
  ? Key extends keyof T // Ensure the key exists in T
    ? { [P in Key]: DeepPick<T[Key], Rest> } // Recursively pick nested fields
    : never
  : never;
