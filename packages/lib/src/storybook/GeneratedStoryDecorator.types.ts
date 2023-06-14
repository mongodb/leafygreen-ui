import { Args } from '@storybook/csf';
import { StoryFn } from '@storybook/react';
import React, { type ComponentProps } from 'react';

import { StoryMetaType, type LeafyGreenProviderProps } from './StoryMeta.types';

export type ExtendedComponentProps<
  T extends React.ElementType,
  XP extends Record<string, any> = {},
> = ComponentProps<T> & LeafyGreenProviderProps;

interface InstanceContext {
  args: Args;
}

export type InstanceDecorator<
  T extends React.ElementType = React.ElementType<any>,
> = (Instance: StoryFn, context?: InstanceContext) => JSX.Element;

export interface GeneratedStoryConfig<
  T extends React.ElementType,
  XP extends Record<string, any> = {},
> {
  /**
   * An array of story names to convert into a Generated stories
   *
   * Stories named `Generated` will be included by default
   */
  storyNames?: Array<string>;

  /**
   * The args to iterate over and create combinations
   */
  combineArgs?: Partial<
    | {
        [key in keyof ExtendedComponentProps<T, XP>]: Array<
          ExtendedComponentProps<T, XP>[key]
        >;
      }
  >;

  /**
   * Specify any prop values that should be different than those defined in `meta`.
   *
   * Keys listed in `args` will be omitted from `props`
   */
  args?: Partial<
    | {
        [key in keyof ExtendedComponentProps<T, XP>]: ExtendedComponentProps<
          T,
          XP
        >[key];
      }
  >;

  /**
   * Add a decorator to each instance.
   *
   * Decorators defined in `meta.decorators`
   * are not applied to generated story instances
   */
  decorator?: InstanceDecorator;

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
    | [keyof ExtendedComponentProps<T, XP>, keyof ExtendedComponentProps<T, XP>]

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
        keyof ExtendedComponentProps<T, XP>,
        Partial<{
          [key in keyof ExtendedComponentProps<T, XP>]:
            | ExtendedComponentProps<T, XP>[key]
            | Array<ExtendedComponentProps<T, XP>[key]>;
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
        [key in keyof ExtendedComponentProps<T, XP>]:
          | ExtendedComponentProps<T, XP>[key]
          | Array<ExtendedComponentProps<T, XP>[key]>;
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
