/**
 * Constructs a union type from the possible values of type `T`
 */
export type ValuesOf<T> = T[keyof T];
