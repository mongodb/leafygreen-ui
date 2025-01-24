import React from 'react';
import { StoryFn } from '@storybook/react';

import { Drawer } from '.';

export default {
  title: 'Components/Drawer',
  component: Drawer,
};

const Template: StoryFn<typeof Drawer> = props => <Drawer {...props} />;

export const Basic = Template.bind({});
