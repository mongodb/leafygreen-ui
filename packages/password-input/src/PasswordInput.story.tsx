
import React from 'react';
import { ComponentStory } from '@storybook/react';

import {PasswordInput} from '.';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
}

const Template: ComponentStory<typeof PasswordInput> = (props) => (
  <PasswordInput {...props} />
);

export const Basic = Template.bind({});

