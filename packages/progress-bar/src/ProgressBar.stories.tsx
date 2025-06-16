
import React from 'react';
import { StoryFn } from '@storybook/react';

import { ProgressBar } from '.';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
}

const Template: StoryFn<typeof ProgressBar> = (props) => (
  <ProgressBar {...props} />
);

export const Basic = Template.bind({});

