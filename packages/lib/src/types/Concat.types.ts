/**
 * Concatenates two string literals with a separator.
 */
export type Concat<
  S1 extends string,
  S2 extends string,
  Separator extends string = '.',
> = S1 extends '' ? S2 : `${S1}${Separator}${S2}`;
