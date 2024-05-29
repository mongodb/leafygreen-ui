import React, { ComponentProps } from 'react';
import { Meta } from '@storybook/react';

import { StoryArgType } from '../storybookArgTypes';

import { GeneratedStoryConfig } from './GeneratedStoryDecorator.types';
import { LeafyGreenProviderProps } from './shared.types';

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
export type StoryParameters<
  /** The component type */
  T extends React.ElementType,
  /** Any eXtra Props the story should support */
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

  /**
   * Configuration for the controls (knobs) in Storybook
   */
  controls?: ControlsConfig;

  /**
   * Configuration for Chromatic-specific behavior
   */
  chromatic?: ChromaticConfig;
};

/**
 * Story control arg types
 */
export type ArgTypes<
  /** The component type */
  T extends React.ElementType,
  /** Any eXtra Props the story should support */
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
 * Custom typed extension of {@link Meta}, the Story default export
 */
export type StoryMetaType<
  /** The component type */
  T extends React.ElementType,
  /** Any eXtra Props the story should support */
  XP extends Record<string, any> = {},
> = Omit<Meta<T>, 'component' | 'argTypes' | 'args'> & {
  title?: string;
  component?: T;
  parameters: StoryParameters<T, XP>;
  argTypes?: ArgTypes<T, XP>;
  args?: Partial<ComponentProps<T> | LeafyGreenProviderProps | XP>;
};
