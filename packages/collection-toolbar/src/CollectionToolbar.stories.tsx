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
        variant: Object.values(Variant),
        size: Object.values(Size),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(Variant),
    },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    darkMode: storybookArgTypes.darkMode,
  },
};

export default meta;

export const LiveExample: StoryFn<typeof CollectionToolbar> = props => (
  <CollectionToolbar {...props} />
);

export const Title: StoryFn<typeof CollectionToolbar> = props => (
  <CollectionToolbar {...props}>
    <CollectionToolbar.Title>Title</CollectionToolbar.Title>
  </CollectionToolbar>
);
