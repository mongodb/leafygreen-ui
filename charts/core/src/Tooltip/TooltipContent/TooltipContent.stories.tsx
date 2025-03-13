import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';

import { TooltipContent } from './TooltipContent';
import { sampleTooltipParams } from './TooltipContent.testUtils';
import { TooltipContentProps } from './TooltipContent.types';

export default {
  title: 'Charts/Tooltip',
  component: TooltipContent,
  args: {
    params: sampleTooltipParams,
    sortDirection: 'desc',
    sortKey: 'value',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

export const Default: StoryObj<TooltipContentProps> = {};
