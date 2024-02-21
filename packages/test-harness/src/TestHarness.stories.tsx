
import React from 'react';
import { StoryFn } from '@storybook/react';

import { TestHarness } from '.';

export default {
  title: 'Components/TestHarness',
  component: TestHarness,
}

const Template: StoryFn<typeof TestHarness> = (props) => (
  <TestHarness {...props} />
);

export const Basic = Template.bind({});

