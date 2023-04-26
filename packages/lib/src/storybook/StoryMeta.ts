import { ComponentMeta } from '@storybook/react';
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

export interface StoryMetaType<
  T extends React.ElementType,
  XP extends Record<string, any> = {},
> extends Omit<ComponentMeta<T>, 'component' | 'argTypes' | 'args'> {
  parameters: ComponentMeta<T>['parameters'] & {
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
}

export const baseMeta: Partial<StoryMetaType<any>> = {
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

export const StoryMeta = <
  T extends React.ElementType,
  XP extends Record<string, any>,
>(
  meta: StoryMetaType<T, XP> = baseMeta as StoryMetaType<T, XP>,
): StoryMetaType<T, XP> => {
  return mergeWith(meta, baseMeta, (metaVal, baseVal) => {
    if (Array.isArray(metaVal)) return metaVal.concat(baseVal);
    if (typeof metaVal === 'string') return metaVal;
    // default to _.merge behavior
    return;
  });
};
