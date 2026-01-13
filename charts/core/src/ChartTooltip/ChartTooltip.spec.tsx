import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';

import { ChartInstance } from '../Chart/hooks/useChart.types';
import { ChartContext } from '../ChartContext/ChartContext';

import { ChartTooltip } from './ChartTooltip';

const createMockChartInstance = (
  overrides: Partial<ChartInstance> = {},
): ChartInstance => ({
  id: 'test-chart',
  ref: jest.fn(),
  enableGroupTooltipSync: false,
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
    <ChartContext.Provider value={{ chart: chartInstance }}>
      {children}
    </ChartContext.Provider>
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
      mockChart.updateOptions.mockClear();

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
      mockChart.updateOptions.mockClear();

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
      mockChart.updateOptions.mockClear();

      // Update to unpinned state
      mockChart.tooltipPinned = false;
      rerender(<ChartTooltip />);

      // updateOptions should be called to restore normal mode
      expect(mockChart.updateOptions).toHaveBeenCalled();
    });
  });
});
