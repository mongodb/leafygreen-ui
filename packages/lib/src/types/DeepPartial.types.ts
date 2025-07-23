/**
 * Returns a recursive partial of a given type.
 *
 * e.g.
 * ```ts
 * interface Foo {
 *  a: {
 *    b: {
 *      c: any
 *    },
 *    d: any
 *  }
 * }
 *
 * const x {
 *  a: {
 *    d: 'foo'
 *  }
 * } satisfies DeepPartial<Foo>
 * ```
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
