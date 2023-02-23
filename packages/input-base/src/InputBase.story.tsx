
import React from 'react';
import { ComponentStory } from '@storybook/react';

import {InputBase} from '.';

export default {
  title: 'Components/InputBase',
  component: InputBase,
}

const Template: ComponentStory<typeof InputBase> = (props) => (
  <InputBase {...props} />
);

export const Basic = Template.bind({});

