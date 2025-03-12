import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

import { DragProvider } from './DragProvider';
import {
  DragChartProps,
  LiveExampleComponent,
  moveTarget,
  renderChart,
  renderChartCard,
} from './DragProvider.storyUtils';

export default {
  title: 'Charts/DragProvider',
  component: DragProvider,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  args: {
    onChartReady: fn(),
    onDragStart: fn(),
    onDragEnd: fn(),
  },
};

export const LiveExample: StoryObj<{}> = {
  render: () => <LiveExampleComponent />,
};

export const DraggedChart: StoryObj<DragChartProps> = {
  render: ({ onChartReady, onDragStart, onDragEnd }) => (
    <div style={{ height: '100%', width: '300px' }}>
      <DragProvider onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {renderChart('chart-id', onChartReady)}
      </DragProvider>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(args.onChartReady).toHaveBeenCalled();
    });

    const target = await canvas.getByTestId('lg-charts-core-chart-header');
    await moveTarget({ target });
  },
};

export const DraggedOpenChartCard: StoryObj<DragChartProps> = {
  render: args => renderChartCard(args),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(args.onChartReady).toHaveBeenCalled();
    });

    const target = await canvas.getByTestId('lg-charts-core-chart_card-header');
    await moveTarget({ target });
  },
};

export const DraggedClosedChart: StoryObj<DragChartProps> = {
  render: args => renderChartCard(args),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(args.onChartReady).toHaveBeenCalled();
    });

    const toggleButton = await canvas.getByTestId(
      'lg-charts-core-chart_card-toggle-button',
    );
    await userEvent.click(toggleButton);

    const target = await canvas.getByTestId('lg-charts-core-chart_card-header');
    await moveTarget({ target });
  },
};
