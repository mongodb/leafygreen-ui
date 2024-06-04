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
> = Keys extends [
  infer Key, // the current union of keys
  ...infer Rest,
]
  ? Strict extends true
    ? Record<Key & string, RecursiveRecord<Rest, Strict>>
    : Partial<Record<Key & string, RecursiveRecord<Rest, Strict>>>
  : Keys;
