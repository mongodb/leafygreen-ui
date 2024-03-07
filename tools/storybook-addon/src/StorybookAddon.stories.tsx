
import React from 'react';
import { StoryFn } from '@storybook/react';

import { StorybookAddon } from '.';

export default {
  title: 'Components/StorybookAddon',
  component: StorybookAddon,
}

const Template: StoryFn<typeof StorybookAddon> = (props) => (
  <StorybookAddon {...props} />
);

export const Basic = Template.bind({});

