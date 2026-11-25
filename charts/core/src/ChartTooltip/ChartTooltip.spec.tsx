import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';

import { ChartInstance } from '../Chart/hooks/useChart.types';
import { ChartContext } from '../ChartContext/ChartContext';
import { ChartGroupProvider } from '../ChartGroupContext';
import { updateOptions } from '../Echart/updateUtils';

import { ChartTooltip } from './ChartTooltip';

const createMockChartInstance = (
  overrides: Partial<ChartInstance> = {},
): ChartInstance => ({
  id: 'test-chart',
  ref: jest.fn(),
  state: undefined,
  isChartHovered: false,
  setTooltipMounted: jest.fn(),
  tooltipPinned: false,
  _getEChartsInstance: jest.fn(),
  _getOptions: jest.fn(),
  addSeries: jest.fn(),
  addToGroup: jest.fn(),
  enableZoom: jest.fn(),
  error: null,
  hideTooltip: jest.fn(),
  off: jest.fn(),
  on: jest.fn(),
  ready: true,
  removeFromGroup: jest.fn(),
  removeSeries: jest.fn(),
  resize: jest.fn(),
  setupZoomSelect: jest.fn(),
  showTooltip: jest.fn(),
  updateOptions: jest.fn(),
  ...overrides,
});

const createWrapper = (chartInstance: ChartInstance) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>) => (
    <ChartGroupProvider groupId="test-group" enableTooltipSync={false}>
      <ChartContext.Provider value={{ chart: chartInstance }}>
        {children}
      </ChartContext.Provider>
    </ChartGroupProvider>
  );
  Wrapper.displayName = 'ChartContextWrapper';
  return Wrapper;
};

describe('@lg-charts/core/ChartTooltip', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('pinned tooltip stability', () => {
    test('should call updateOptions on initial render when tooltip is pinned', () => {
      const mockChart = createMockChartInstance({
        ready: true,
        tooltipPinned: true,
      });

      render(<ChartTooltip />, {
        wrapper: createWrapper(mockChart),
      });

      expect(mockChart.updateOptions).toHaveBeenCalledTimes(1);
    });

    test('should not call updateOptions when tooltip stays pinned during re-render', () => {
      const mockChart = createMockChartInstance({
        ready: true,
        tooltipPinned: true,
      });

      const { rerender } = render(<ChartTooltip />, {
        wrapper: createWrapper(mockChart),
      });

      // First render calls updateOptions once
      expect(mockChart.updateOptions).toHaveBeenCalledTimes(1);

      // Clear mock to track subsequent calls
      (mockChart.updateOptions as jest.Mock).mockClear();

      // Re-render with tooltip still pinned (simulating parent re-render)
      rerender(<ChartTooltip />);

      // updateOptions should NOT be called again since tooltip stays pinned
      expect(mockChart.updateOptions).not.toHaveBeenCalled();
    });

    test('should call updateOptions when tooltip changes from unpinned to pinned', () => {
      const mockChart = createMockChartInstance({
        ready: true,
        tooltipPinned: false,
      });

      const { rerender } = render(<ChartTooltip />, {
        wrapper: createWrapper(mockChart),
      });

      expect(mockChart.updateOptions).toHaveBeenCalledTimes(1);
      (mockChart.updateOptions as jest.Mock).mockClear();

      // Update to pinned state
      mockChart.tooltipPinned = true;
      rerender(<ChartTooltip />);

      // updateOptions should be called to configure pinned mode
      expect(mockChart.updateOptions).toHaveBeenCalled();
    });

    test('should call updateOptions when tooltip changes from pinned to unpinned', () => {
      const mockChart = createMockChartInstance({
        ready: true,
        tooltipPinned: true,
      });

      const { rerender } = render(<ChartTooltip />, {
        wrapper: createWrapper(mockChart),
      });

      expect(mockChart.updateOptions).toHaveBeenCalledTimes(1);
      (mockChart.updateOptions as jest.Mock).mockClear();

      // Update to unpinned state
      mockChart.tooltipPinned = false;
      rerender(<ChartTooltip />);

      // updateOptions should be called to restore normal mode
      expect(mockChart.updateOptions).toHaveBeenCalled();
    });
  });

  describe('positioning', () => {
    const getTooltipOptions = (mockChart: ChartInstance) =>
      (mockChart.updateOptions as jest.Mock).mock.calls[0][0].tooltip;

    test('confines the tooltip to the chart by default', () => {
      const mockChart = createMockChartInstance();

      render(<ChartTooltip />, { wrapper: createWrapper(mockChart) });

      expect(getTooltipOptions(mockChart).confine).toBe(true);
      expect(getTooltipOptions(mockChart).position).toBeUndefined();
    });

    test('passes confine and position through to the tooltip options', () => {
      const mockChart = createMockChartInstance();
      const position = jest.fn(() => [0, 0]);

      render(<ChartTooltip confine={false} position={position} />, {
        wrapper: createWrapper(mockChart),
      });

      expect(getTooltipOptions(mockChart).confine).toBe(false);
      expect(getTooltipOptions(mockChart).position).toBe(position);
    });

    test('restores automatic placement when position is removed', () => {
      const mockChart = createMockChartInstance();
      const wrapper = createWrapper(mockChart);
      const position = jest.fn(() => [0, 0]);

      const { rerender } = render(<ChartTooltip position={position} />, {
        wrapper,
      });
      rerender(<ChartTooltip />);

      const merged = (mockChart.updateOptions as jest.Mock).mock.calls.reduce(
        (acc, [options]) => updateOptions(acc, options),
        {},
      );
      expect(merged.tooltip.position).toBeUndefined();
    });
  });
});
