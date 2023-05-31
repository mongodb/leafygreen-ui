import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import { Size } from './Skeleton/Skeleton.types';
import { Skeleton } from '.';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'select',
      options: Object.values(Size),
      defaultValue: Size.Default,
    },
  },
};

const Template: StoryFn<typeof Skeleton> = props => (
  <div style={{ width: 600 }}>
    <Skeleton {...props} />
  </div>
);

export const Basic = Template.bind({});
