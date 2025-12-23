
import React from 'react';
import { StoryFn } from '@storybook/react';

import { CollectionToolbar } from '.';

export default {
  title: 'Components/CollectionToolbar',
  component: CollectionToolbar,
}

const Template: StoryFn<typeof CollectionToolbar> = (props) => (
  <CollectionToolbar {...props} />
);

export const Basic = Template.bind({});

