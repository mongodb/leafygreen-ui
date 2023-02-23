
import React from 'react';
import { ComponentStory } from '@storybook/react';

import {NumberInput} from '.';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
}

const Template: ComponentStory<typeof NumberInput> = (props) => (
  <NumberInput {...props} />
);

export const Basic = Template.bind({});

