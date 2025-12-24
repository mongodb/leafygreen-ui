import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { CollectionToolbar, Size, Variant } from '.';

const meta: StoryMetaType<typeof CollectionToolbar> = {
  title: 'Components/CollectionToolbar',
  component: CollectionToolbar,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
        variant: Object.values(Variant),
      },
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    variant: {
      control: 'select',
      options: Object.values(Variant),
    },
  },
  args: {
    children: 'Collection Toolbar',
  },
};

export default meta;

export const LiveExample: StoryFn<typeof CollectionToolbar> = props => (
  <CollectionToolbar {...props} />
);
