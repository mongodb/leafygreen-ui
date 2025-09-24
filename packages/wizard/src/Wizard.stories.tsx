
import React from 'react';
import { StoryFn } from '@storybook/react';

import { Wizard } from '.';

export default {
  title: 'Components/Wizard',
  component: Wizard,
}

const Template: StoryFn<typeof Wizard> = (props) => (
  <Wizard {...props} />
);

export const Basic = Template.bind({});

