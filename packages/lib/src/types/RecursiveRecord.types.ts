/**
 * Create a recursive Record type of any number of key sets.
 *
 * The second parameter (`Strict`) determines whether each union of Keys
 * must be complete in each recursive `Record`
 * Passing `false` to this parameter will wrap each recursive `Record` in `Partial`,
 * resulting in a looser Record definition.
 *
 * E.g.
 * ```ts
 * ColorRecord = RecursiveRecord<
 *   [Theme, Property, Variant, State, string],
 *   false
 * > =
 * Partial<Record<Theme,
 *   Partial<Record<Property,
 *     Partial<Record<Variant,
 *       Partial<Record<State, string>>
 *     >>
 *   >>
 * >>
 * ```
 * */
export type RecursiveRecord<
  Keys extends Array<any>,
  Strict extends boolean = true,
> =
  // If `Keys` is an array with at least 2 indexes
  Keys extends [
    infer Key, // the current union of keys
    ...infer Rest extends [infer _K, ...infer _R], // (`Keys` has at least 2 indexes if 2nd argument can also be inferred)
  ]
    ? // If this is strict, then don't use Partial
      Strict extends true
      ? Record<Key & string, RecursiveRecord<Rest, Strict>>
      : Partial<Record<Key & string, RecursiveRecord<Rest, Strict>>>
    : Keys extends [infer Key] // If Keys has only 1 index
    ? Key // return that index
    : never; // otherwise there's an error
