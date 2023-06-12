import { PlayFunctionContext } from '@storybook/csf';
import { Meta, ReactRenderer, StoryFn, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import DarkModeProps from '../DarkModeProps';
import { GeneratedStoryConfig } from './GeneratedStoryDecorator.types';

import { StoryArgType } from './storybookArgTypes';

// Re-defining LG provider prop keys here since importing from the package
// will cause circular dependencies
export interface LeafyGreenProviderProps extends DarkModeProps {
  baseFontSize?: number;
}

export interface ControlsConfig {
  /**
   * Props excluded from controls
   */
  exclude: Array<string>;
}

/**
 * Parameters for Chromatic.
 *
 * Compiled from https://mongodb.chromatic.com/docs/
 *
 * (types not defined in `chromatic` package)
 */
export interface ChromaticConfig {
  /** https://mongodb.chromatic.com/docs/ignoring-elements#ignore-stories */
  disableSnapshot?: boolean;
  /** https://mongodb.chromatic.com/docs/delay#delay-a-story */
  delay?: number;
  /** https://mongodb.chromatic.com/docs/animations#css-animations */
  pauseAnimationAtEnd?: boolean;
  /** https://mongodb.chromatic.com/docs/threshold#setting-the-threshold */
  diffThreshold?: number;
  /** https://mongodb.chromatic.com/docs/threshold#anti-aliasing */
  diffIncludeAntiAliasing?: boolean;
  [key: string]: any;
}

/**
 * Story Parameters
 */
type StoryParameters<
  T extends React.ElementType,
  XP extends Record<string, any> = {},
> = Meta<T>['parameters'] & {
  /**
   * The default story to be displayed on `mongodb.design`.
   * Explicitly exclude a default story by setting this to `null`
   */
  default: string | null;

  /**
   * The configuration for the generated stories
   */
  generate?: GeneratedStoryConfig<T, XP>;

  controls?: ControlsConfig;

  chromatic?: ChromaticConfig;
};

/**
 * Story control arg types
 */
type ArgTypes<
  T extends React.ElementType,
  XP extends Record<string, any> = {},
> = Partial<
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

/**
 * Type of the Story default export
 */
export type StoryMetaType<
  T extends React.ElementType,
  XP extends Record<string, any> = {},
> = Omit<Meta<T>, 'component' | 'argTypes' | 'args'> & {
  title?: string;
  component?: T;
  parameters: StoryParameters<T, XP>;
  argTypes?: ArgTypes<T, XP>;
  args?: Partial<ComponentProps<T> | LeafyGreenProviderProps | XP>;
};

export type StoryType<
  T extends React.ElementType,
  XP extends Record<string, any> = {},
> = (StoryFn<T> | StoryObj<T>) & {
  parameters?: Omit<StoryParameters<T, XP>, 'default'>;
  argTypes?: ArgTypes<T, XP>;
  args?: Partial<ComponentProps<T> | LeafyGreenProviderProps | XP>;
  play?: (
    context: PlayFunctionContext<ReactRenderer, ComponentProps<T> | XP>,
  ) => Promise<void> | void;
};
