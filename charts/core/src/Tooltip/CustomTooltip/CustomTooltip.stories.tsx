import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';

import { CustomTooltip } from './CustomTooltip';
import { sampleTooltipParams } from './CustomTooltip.testUtils';
import { CustomTooltipProps } from './CustomTooltip.types';

export default {
  title: 'Charts/Tooltip',
  component: CustomTooltip,
  args: {
    seriesData: sampleTooltipParams,
    sortDirection: 'desc',
    sortKey: 'value',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

export const Default: StoryObj<CustomTooltipProps> = {};
