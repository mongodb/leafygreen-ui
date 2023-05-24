import { ComponentProps } from 'react';

export interface GeneratedStoryConfig<T extends React.ElementType> {
  props: Partial<
    | {
        [key in keyof ComponentProps<T>]: Array<ComponentProps<T>[key]>;
      }
  >;

  /**
   * Specify any prop values that should be different than those defined in `meta`
   */
  args?: Partial<
    | {
        [key in keyof ComponentProps<T>]: ComponentProps<T>[key];
      }
  >;

  /** Exclude certain combinations of props */
  excludeCombinations?: Array<
    /**
     * Exclude every combination of these props
     * (i.e. these props are mutually exclusive)
     *
     * ```
     * excludeCombinations: [['checked', 'indeterminate']]
     * ```
     */
    | [keyof ComponentProps<T>, keyof ComponentProps<T>]

    /**
     * Exclude a prop given a condition
     * (i.e. skip a prop when another prop is a specific value)
     *
     * If multiple key:values are included in the object,
     * then they all must match to exclude this combination (i.e. AND comparator)
     *
     * ```
     * excludeCombinations: [
     *  [
     *    "description",
     *    {
     *      label: undefined,
     *    }
     *  ]
     * ]
     * ```
     */
    | [
        keyof ComponentProps<T>,
        {
          [key in keyof ComponentProps<T>]: ComponentProps<T>[key];
        },
      ]

    /**
     * Exclude specific combinations of prop values
     *
     * ```
     * excludeCombinations: [
     *    {
     *      children: undefined
     *      rightGlyph: undefined
     *    },
     * ]
     * ```
     */
    | {
        [key in keyof ComponentProps<T>]: ComponentProps<T>[key];
      }
  >;
}
