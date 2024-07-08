/**
 * Constructs a type consisting of all properties of type `T`,
 * with a subset set of properties `K` marked optional.
 *
 * The inverse of `PartialRequired`
 */
export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
