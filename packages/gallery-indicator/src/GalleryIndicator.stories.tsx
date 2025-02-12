import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { GalleryIndicator } from '.';

const meta: StoryMetaType<typeof GalleryIndicator> = {
  title: 'Components/GalleryIndicator',
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
      },
    },
  },
  args: {
    activeIndex: 0,
    length: 4,
    darkMode: false,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

export default meta;

export const LiveExample: StoryFn<typeof GalleryIndicator> = props => {
  return <GalleryIndicator {...props} />;
};

export const Generated = () => {};
