import React, { ComponentProps } from 'react';
import { PlayFunction } from '@storybook/csf';
import { ReactRenderer, StoryFn, StoryObj } from '@storybook/react';

import { LeafyGreenProviderProps } from './shared.types';
import { ArgTypes, StoryParameters } from './StoryMeta.types';

/**
 * Custom typed extension of Storybook's {@link PlayFunction}
 */
export type PlayFn<
  /** The component type */
  T extends React.ElementType,
  /** Any eXtra Props the story should support */
  XP extends Record<string, any> = {},
> = PlayFunction<ReactRenderer, ComponentProps<T> & XP>;

/**
 * Custom typed extension of Storybook's {@link StoryObj}
 */
export type LGStoryObject<
  /** The component type */
  T extends React.ElementType,
  /** Any eXtra Props the story should support */
  XP extends Record<string, any> = {},
> = StoryObj<ComponentProps<T> & XP> & {
  parameters?: Omit<StoryParameters<T, XP>, 'default'>;
  argTypes?: ArgTypes<T, XP>;
  args?: Partial<ComponentProps<T> | LeafyGreenProviderProps | XP>;
  play?: PlayFn<T, XP>;
};

/**
 * Custom typed extension of Storybook's {@link StoryFn}
 */
export type LGStoryFn<
  /** The component type */
  T extends React.ElementType,
  /** Any eXtra Props the story should support */
  XP extends Record<string, any> = {},
> = StoryFn<ComponentProps<T> & XP> & Omit<LGStoryObject<T, XP>, 'render'>;

/**
 * Custom typed extension of Storybook's {@link StoryFn}
 */
export type StoryType<
  /** The component type */
  T extends React.ElementType,
  /** Any eXtra Props the story should support */
  XP extends Record<string, any> = {},
> = LGStoryObject<T, XP> | LGStoryFn<T, XP>;
