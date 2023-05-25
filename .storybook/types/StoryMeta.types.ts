import { Meta } from '@storybook/react';
import { ComponentProps } from 'react';
import { GeneratedStoryConfig } from '../decorators/GeneratedStory/GeneratedStoryDecorator.types';

import { StoryArgType } from '../constants/storybookArgTypes';

// Re-defining LG provider prop keys here since importing from the package
// will cause circular dependencies
export interface LeafyGreenProviderProps {
  darkMode?: boolean;
  baseFontSize?: number;
}

export interface ControlsConfig {
  /**
   * Props excluded from controls
   */
  exclude: Array<string>;
}

/**
 * Parameters for Chromatic
 */
export interface ChromaticConfig {
  disableSnapshot?: boolean;
}

export type StoryMetaType<
  T extends React.ElementType,
  XP extends Record<string, any> = {},
> = Omit<Meta<T>, 'component' | 'argTypes' | 'args'> & {
  parameters: Meta<T>['parameters'] & {
    /**
     * The default story to be displayed on `mongodb.design`.
     * Explicitly exclude a default story by setting this to `null`
     */
    default: string | null;

    /**
     * The configuration for the generated stories
     */
    generate?: GeneratedStoryConfig<T>;

    controls?: ControlsConfig;

    chromatic?: ChromaticConfig;
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
