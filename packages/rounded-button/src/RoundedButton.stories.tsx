
import React from 'react';
import { StoryFn } from '@storybook/react';

import { RoundedButton } from '.';

export default {
  title: 'Components/RoundedButton',
  component: RoundedButton,
}

const Template: StoryFn<typeof RoundedButton> = (props) => (
  <RoundedButton {...props} />
);

export const Basic = Template.bind({});

