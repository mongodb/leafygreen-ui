import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';

import { Legend } from './Legend';

export default {
  title: 'Charts/Legend',
  component: Legend,
  args: {},
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

export const Basic: StoryObj<{}> = {
  render: () => {
    return <></>;
  },
};
