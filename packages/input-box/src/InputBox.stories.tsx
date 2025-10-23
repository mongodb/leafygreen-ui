
import React from 'react';
import { StoryFn } from '@storybook/react';

import { InputBox } from '.';

export default {
  title: 'Components/InputBox',
  component: InputBox,
}

const Template: StoryFn<typeof InputBox> = (props) => (
  <InputBox {...props} />
);

export const Basic = Template.bind({});

