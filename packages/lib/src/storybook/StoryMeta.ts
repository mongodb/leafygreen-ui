import { Meta } from '@storybook/react';
import mergeWith from 'lodash/mergeWith';
import { ComponentProps } from 'react';
import DarkModeProps from '../DarkModeProps';

import { StoryArgType, storybookArgTypes } from './storybookArgTypes';
import { storybookExcludedControlParams } from './storybookExcludedControlParams';

// Re-defining LG provider prop keys here since importing from the package
// will cause circular dependencies
interface LeafyGreenProviderProps extends DarkModeProps {
  baseFontSize?: number;
}

export type StoryMetaType<
  T extends React.ElementType,
  XP extends Record<string, any> = {},
> = Omit<Meta<T>, 'component' | 'argTypes' | 'args'> & {
  parameters: Meta<T>['parameters'] & {
    /**
     * The default story to be displayed on `mongodb.design`
     */
    default: string;
  };
  argTypes?: Partial<
    | {
        [key in keyof ComponentProps<T>]: StoryArgType;
      }
    | {
        [key in keyof LeafyGreenProviderProps]: StoryArgType;
      }
    | {
        [key in keyof XP]: StoryArgType;
      }
  >;
  args?: Partial<ComponentProps<T> | LeafyGreenProviderProps | XP>;
  component?: T;
  title?: string;
};

export const baseStoryMeta: Partial<StoryMetaType<any>> = {
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    baseFontSize: storybookArgTypes.updatedBaseFontSize,
  },
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
  },
};

/**
 *
 * Storybook 7.x requires a statically defined object as the default export.
 *
 * Use {@link StoryMetaType} (and {@link baseStoryMeta} as necessary)
 *
 * Example:
 *
 * ```ts
 * const meta: StoryMetaType<typeof Component> = {
 *  component: Component,
 *  ...baseStoryMeta
 * }
 * export default meta
 * ```
 *
 * @deprecated
 */
export const StoryMeta = <
  T extends React.ElementType,
  XP extends Record<string, any>,
>(
  meta: StoryMetaType<T, XP> = baseStoryMeta as StoryMetaType<T, XP>,
): StoryMetaType<T, XP> => {
  return mergeWith(meta, baseStoryMeta, (metaVal, baseVal) => {
    if (Array.isArray(metaVal)) return metaVal.concat(baseVal);
    if (typeof metaVal === 'string') return metaVal;
    // default to _.merge behavior
    return;
  });
};
