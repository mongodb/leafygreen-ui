/**
 * Constructs a type consisting of only the property `K` from type `T`.
 *
 * Similar to `Pick`, but explicitly sets the type of all remaining properties
 * to `never`
 */
export type Only<T, K extends keyof T> = Pick<T, K> & {
  [X in Exclude<keyof T, K>]?: never;
};
