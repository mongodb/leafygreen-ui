/** Helper type to extract an HTML element's valid props */
export type HTMLElementProps<
  Element extends keyof JSX.IntrinsicElements,
  RefType extends HTMLElement = never,
> = Omit<JSX.IntrinsicElements[Element], 'ref'> & {
  ref?: [RefType] extends [never] ? never : React.Ref<RefType>;
  key?: React.Key | null;
};

/**
 * Helper that constructs a type requiring at least one of the passed keys
 * to be present in the passed interface.
 *
 * Example
 * ```
 * interface ExampleInterface {
 *   alwaysRequired: boolean,
 *   sometimesRequired: boolean,
 *   requiredOtherTimes: boolean,
 * }
 *
 * type ExampleEither = Either<ExampleInterface, 'sometimesRequired' | 'requiredOtherTimes'>
 *
 * // The above is equivalent to:
 * interface SharedInExampleInterface {
 *   alwaysRequired: boolean,
 * }
 *
 * interface FirstIsRequired extends SharedInExampleInterface {
 *   sometimesRequired: boolean,
 *   requiredOtherTimes?: boolean,
 * }
 *
 * interface SecondIsRequired extends SharedInExampleInterface {
 *   sometimesRequired?: boolean,
 *   requiredOtherTimes: boolean,
 * }
 *
 * type EquivalentToExampleEither = FirstIsRequired | SecondIsRequired
 * ```
 */
export type Either<T, Keys extends keyof T = keyof T> = Omit<T, Keys> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/**
 * Helper that constructs mutually exclusive record types. Refer to tests for usage.
 */
export type OneOf<T1, T2> =
  | (T1 & Partial<Record<Exclude<keyof T2, keyof T1>, never>>)
  | (T2 & Partial<Record<Exclude<keyof T1, keyof T2>, never>>);

/**
 * Accepts a type as an argument and makes all of the keys of the type optional
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<RecursivePartial<U>>
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P] extends infer U | undefined
    ? RecursivePartial<U> | undefined
    : T[P] extends infer U | null
    ? RecursivePartial<U> | null
    : T[P];
};
