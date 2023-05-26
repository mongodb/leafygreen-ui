import { type ComponentProps } from 'react';
import { Args } from '@storybook/csf';
import { Decorator, StoryFn } from '@storybook/react';

import {
  type LeafyGreenProviderProps,
  StoryMetaType,
} from '../../types/StoryMeta.types';

type ExtendedComponentProps<T extends React.ElementType> = ComponentProps<T> &
  LeafyGreenProviderProps;

type InstanceFn = StoryFn;

interface InstanceContext {
  args: Args;
}

export interface GeneratedStoryConfig<T extends React.ElementType> {
  props: Partial<
    | {
        [key in keyof ExtendedComponentProps<T>]: Array<
          ExtendedComponentProps<T>[key]
        >;
      }
  >;

  /**
   * Specify any prop values that should be different than those defined in `meta`
   */
  args?: Partial<
    | {
        [key in keyof ExtendedComponentProps<T>]: ExtendedComponentProps<T>[key];
      }
  >;

  /**
   * Add a decorator to each instance.
   *
   * Decorators defined in `meta.decorators`
   * are not applied to generated story instances
   */
  decorator?: (
    Story: InstanceFn,
    context?: InstanceContext,
  ) => ReturnType<Decorator>;

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
    | [keyof ExtendedComponentProps<T>, keyof ExtendedComponentProps<T>]

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
        keyof ExtendedComponentProps<T>,
        Partial<{
          [key in keyof ExtendedComponentProps<T>]: ExtendedComponentProps<T>[key];
        }>,
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
    | Partial<{
        [key in keyof ExtendedComponentProps<T>]: ExtendedComponentProps<T>[key];
      }>
  >;
}

export interface GeneratedStoryFn<T extends React.ElementType> {
  (): void;
  parameters?: Omit<StoryMetaType<T>['parameters'], 'default' | 'generate'>;
  argTypes?: StoryMetaType<T>['argTypes'];
  args?: StoryMetaType<T>['args'];
  title?: string;
}
