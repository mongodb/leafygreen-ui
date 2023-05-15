
import React from 'react';
import { ComponentStory } from '@storybook/react';

import {SplitButton} from '.';

export default {
  title: 'Components/SplitButton',
  component: SplitButton,
}

const Template: ComponentStory<typeof SplitButton> = (props) => (
  <SplitButton {...props} />
);

export const Basic = Template.bind({});

