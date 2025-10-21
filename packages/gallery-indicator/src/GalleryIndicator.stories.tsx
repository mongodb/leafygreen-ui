import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { GalleryIndicator, Variant } from '.';

const meta: StoryMetaType<typeof GalleryIndicator> = {
  title: 'Components/Display/GalleryIndicator',
  component: GalleryIndicator,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        activeIndex: [0, 1, 2, 3],
        variant: Object.values(Variant),
      },
    },
  },
  args: {
    activeIndex: 0,
    length: 4,
    darkMode: false,
    variant: Variant.Default,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    activeIndex: {
      control: {
        type: 'range',
        max: 10,
      },
    },
    length: {
      control: {
        type: 'range',
        max: 10,
      },
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(Variant),
      defaultValue: Variant.Default,
    },
  },
};

export default meta;

export const LiveExample: StoryFn<typeof GalleryIndicator> = props => {
  return <GalleryIndicator {...props} />;
};

export const Generated = () => {};
