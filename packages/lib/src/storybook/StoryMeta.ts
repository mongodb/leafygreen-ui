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

type ModifiedStoryMeta<T extends React.ElementType> = Omit<
  Meta<T>,
  'component' | 'argTypes' | 'args'
>;

export type StoryMeta<
  T extends React.ElementType,
  XP extends Record<string, any> = {},
> = ModifiedStoryMeta<T> & {
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
};

const baseMeta: Partial<StoryMeta<any>> = {
  argTypes: {
    ...storybookArgTypes,
  },
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
  },
};

export const StoryMeta = <T extends React.ElementType>(
  meta: StoryMeta<T> = baseMeta as StoryMeta<T>,
): StoryMeta<T> => {
  return mergeWith(meta, baseMeta, (metaVal, baseVal) => {
    if (Array.isArray(metaVal)) return metaVal.concat(baseVal);
    if (typeof metaVal === 'string') return metaVal;
    // default to _.merge behavior
  });
};
