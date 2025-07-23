import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryFn, StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { getRootStylesText } from './ChartTooltip.styles';
import {
  CustomTooltip,
  CustomTooltipProps,
  sampleTooltipParams,
} from './CustomTooltip';

const TooltipRoot = (Story: StoryFn, ctx: any) => {
  const rootClassName = css`
    ${getRootStylesText(ctx.args.darkMode ? 'dark' : 'light')}
  `;

  return (
    <LeafyGreenProvider darkMode={!!ctx.args.darkMode}>
      <div className={rootClassName}>
        <Story />
      </div>
    </LeafyGreenProvider>
  );
};

export default {
  title: 'Composition/Charts/ChartTooltip',
  component: CustomTooltip,
  decorators: [TooltipRoot],
  args: {
    seriesData: sampleTooltipParams,
  },
  argTypes: {
    chartId: {
      table: {
        disable: true,
      },
    },
    darkMode: storybookArgTypes.darkMode,
    headerFormatter: {
      table: {
        disable: true,
      },
    },
    seriesData: {
      table: {
        disable: true,
      },
    },
    seriesNameFormatter: {
      table: {
        disable: true,
      },
    },
    seriesValueFormatter: {
      table: {
        disable: true,
      },
    },
    sort: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    generate: {
      combineArgs: {
        darkMode: [false, true],
        tooltipPinned: [false, true],
      },
      decorator: TooltipRoot,
    },
  },
};

export const Default: StoryObj<CustomTooltipProps> = {
  args: {
    seriesData: sampleTooltipParams.map((series, idx) => ({
      ...series,
      seriesName: 'Series ' + (idx + 1),
    })),
  },
};

export const Generated = () => {};

export const LongSeriesNames: StoryObj<CustomTooltipProps> = {};

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
