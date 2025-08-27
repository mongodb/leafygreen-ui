import React from 'react';
import { StoryFn } from '@storybook/react';

import { SideNav } from '.';

export default {
  title: 'Components/SideNav',
  component: SideNav,
};

const Template: StoryFn<typeof SideNav> = props => <SideNav {...props} />;

export const Basic = Template.bind({});
