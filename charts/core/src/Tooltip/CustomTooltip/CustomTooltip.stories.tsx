import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';

import Icon from '@leafygreen-ui/icon';

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

export const CustomFormats: StoryObj<CustomTooltipProps> = {
  args: {
    seriesNameFormatter: (name: number | string | Date) => {
      const formattedName =
        name instanceof Date ? name.toLocaleDateString() : name;

      const concatenatedName =
        typeof formattedName === 'string'
          ? `${formattedName.substring(0, 16)}...${formattedName.slice(-5)}`
          : formattedName;

      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '4px',
          }}
        >
          <Icon glyph="Secondary" /> <span>{concatenatedName}</span>
        </div>
      );
    },

    seriesValueFormatter: (value: number | string | Date) => {
      const formattedValue =
        value instanceof Date ? value.toLocaleDateString() : value;

      return `${formattedValue} m/s`;
    },
  },
};
