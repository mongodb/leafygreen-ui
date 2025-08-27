import React from 'react';
import { StoryFn } from '@storybook/react';

import { ChatSideNav } from '.';

export default {
  title: 'Components/ChatSideNav',
  component: ChatSideNav,
};

const Template: StoryFn<typeof ChatSideNav> = props => (
  <ChatSideNav {...props} />
);

export const Basic = Template.bind({});
